import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection, getDocs, doc, deleteDoc, updateDoc, onSnapshot,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie, Legend,
} from "recharts";
import "./Admin.css";

/* ── Helper ── */
function timeAgo(seconds) {
  if (!seconds) return "—";
  const diff = Math.floor((Date.now() - seconds * 1000) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

/* ── Stat Card ── */
function StatCard({ icon, label, value, color }) {
  return (
    <div className="adm-stat-card" style={{ "--sc-color": color }}>
      <div className="adm-stat-icon">{icon}</div>
      <div className="adm-stat-body">
        <div className="adm-stat-value">{value}</div>
        <div className="adm-stat-label">{label}</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════ */
export default function Admin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccess] = useState(false);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [pendingIds, setPending] = useState(new Set());
  const [toast, setToast] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const [allActivity, setAllActivity] = useState([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  /* ── Auth + role gate ── */
  const snapUnsubRef = useRef(null);

  useEffect(() => {
    const authUnsub = onAuthStateChanged(auth, async (user) => {
      if (!user) { navigate("/login"); return; }

      /* Check current user's role from Firestore */
      const myDoc = await getDocs(collection(db, "users"));
      const me = myDoc.docs.find(d => d.id === user.uid)?.data();

      if (!me || me.role !== "admin") {
        setAccess(true);
        setLoading(false);
        return;
      }

      /* Real-time listener */
      snapUnsubRef.current = onSnapshot(collection(db, "users"), (snap) => {
        setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        setLoading(false);
      });
    });

    return () => { authUnsub(); snapUnsubRef.current?.(); };
  }, [navigate]);

  /* ── Fetch all activity for Analytics tab ── */
  const fetchAllActivity = useCallback(async () => {
    if (allActivity.length > 0) return;
    setAnalyticsLoading(true);
    try {
      const usersSnap = await getDocs(collection(db, "users"));
      const events = [];
      await Promise.all(
        usersSnap.docs.map(async (userDoc) => {
          const actSnap = await getDocs(collection(db, "users", userDoc.id, "activity"));
          actSnap.docs.forEach(d => events.push({ uid: userDoc.id, ...d.data() }));
        })
      );
      setAllActivity(events);
    } catch (e) { console.error(e); }
    setAnalyticsLoading(false);
  }, [allActivity.length]);

  useEffect(() => {
    if (activeTab === "analytics" && !analyticsLoading) fetchAllActivity();
  }, [activeTab, fetchAllActivity, analyticsLoading]);

  /* ── Aggregate analytics ── */
  const analytics = useMemo(() => {
    const count = (key) => {
      const map = {};
      allActivity.forEach(e => { if (e[key]) map[e[key]] = (map[e[key]] || 0) + 1; });
      return Object.entries(map)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8);
    };
    const evMap = {};
    allActivity.forEach(e => { if (e.event) evMap[e.event] = (evMap[e.event] || 0) + 1; });
    return {
      moods: count("mood"),
      states: count("stateName"),
      attractions: count("attractionName"),
      events: Object.entries(evMap).map(([name, count]) => ({ name, count })),
    };
  }, [allActivity]);

  /* ── Toast ── */
  function showToast(msg) { setToast(msg); setTimeout(() => setToast(""), 2800); }

  /* ── Actions ── */
  async function handleDelete(id) {
    if (!window.confirm("Permanently delete this user's data?")) return;
    setPending(p => new Set(p).add(id));
    await deleteDoc(doc(db, "users", id));
    showToast("User removed.");
    setPending(p => { const s = new Set(p); s.delete(id); return s; });
  }

  async function handleToggleRole(user) {
    const newRole = user.role === "admin" ? "user" : "admin";
    if (!window.confirm(`${newRole === "admin" ? "Promote" : "Demote"} this user?`)) return;
    setPending(p => new Set(p).add(user.id + "_role"));
    await updateDoc(doc(db, "users", user.id), { role: newRole });
    showToast(`${user.displayName || user.email} is now ${newRole}.`);
    setPending(p => { const s = new Set(p); s.delete(user.id + "_role"); return s; });
  }

  /* ── Derived ── */
  const stats = useMemo(() => ({
    total: users.length,
    online: users.filter(u => u.online).length,
    admins: users.filter(u => u.role === "admin").length,
  }), [users]);

  const pieData = [
    { name: "Online", value: stats.online, fill: "#4caf8a" },
    { name: "Offline", value: stats.total - stats.online, fill: "#555" },
  ];
  const barData = [
    { name: "Admins", count: stats.admins },
    { name: "Users", count: stats.total - stats.admins },
  ];

  const filtered = useMemo(() => {
    let list = users;
    if (search) list = list.filter(u =>
      (u.displayName || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(search.toLowerCase())
    );
    if (filterRole !== "all") list = list.filter(u => (u.role || "user") === filterRole);
    if (filterStatus !== "all") list = list.filter(u => filterStatus === "online" ? u.online : !u.online);
    return list;
  }, [users, search, filterRole, filterStatus]);

  const tooltipStyle = { contentStyle: { background: "#1a1f2e", border: "1px solid #333", borderRadius: 8 } };

  /* ── Access denied ── */
  if (accessDenied) return (
    <div className="adm-page">
      <div className="adm-denied">
        <div className="adm-denied-icon">🚫</div>
        <h2>Access Denied</h2>
        <p>You don't have admin privileges to view this page.</p>
        <button className="adm-back-btn" onClick={() => navigate("/dashboard")}>← Back to Dashboard</button>
      </div>
    </div>
  );

  /* ── Render ── */
  return (
    <div className="adm-page">
      {toast && <div className="adm-toast">{toast}</div>}

      {/* Header */}
      <div className="adm-header">
        <button className="adm-back-btn" onClick={() => navigate("/dashboard")}>← Dashboard</button>
        <div className="adm-logo">🧭 TripCompass Admin</div>
        <div className="adm-header-right"><span className="adm-live-dot" /> Live</div>
      </div>

      <div className="adm-content">
        <h1 className="adm-title">Control Panel</h1>
        <p className="adm-subtitle">Real-time user management &amp; analytics</p>

        {/* Stat Cards */}
        <div className="adm-stats-row">
          <StatCard icon="👥" label="Total Users" value={stats.total} color="#d4b26a" />
          <StatCard icon="🟢" label="Online Now" value={stats.online} color="#4caf8a" />
          <StatCard icon="🛡️" label="Admins" value={stats.admins} color="#7c6ff7" />
          <StatCard icon="⚪" label="Offline" value={stats.total - stats.online} color="#888" />
        </div>

        {/* Tab switcher */}
        <div className="adm-tab-row">
          {["users", "analytics"].map(tab => (
            <button key={tab}
              className={`adm-tab-btn ${activeTab === tab ? "adm-tab-active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "users" ? "👥 Users" : "📊 Analytics"}
            </button>
          ))}
          {activeTab === "analytics" && allActivity.length > 0 && (
            <span className="adm-count" style={{ marginLeft: "auto" }}>
              {allActivity.length} events tracked
            </span>
          )}
        </div>

        {/* ══ USERS TAB ══ */}
        {activeTab === "users" && (
          <>
            {/* Charts */}
            <div className="adm-charts-row">
              <div className="adm-chart-box">
                <p className="adm-chart-title">Online / Offline</p>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={65} label>
                      {pieData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                    </Pie>
                    <Legend /><Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="adm-chart-box">
                <p className="adm-chart-title">Roles Breakdown</p>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={barData} barSize={40}>
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" allowDecimals={false} />
                    <Tooltip {...tooltipStyle} />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      <Cell fill="#7c6ff7" /><Cell fill="#d4b26a" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Filters */}
            <div className="adm-filters-bar">
              <input className="adm-search" placeholder="🔍  Search by name or email…"
                value={search} onChange={e => setSearch(e.target.value)} />
              <select className="adm-select" value={filterRole} onChange={e => setFilterRole(e.target.value)}>
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <select className="adm-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
              <span className="adm-count">{filtered.length} of {users.length} users</span>
            </div>

            {/* Table */}
            {loading ? (
              <div className="adm-loading"><div className="adm-spinner" /><p>Loading users…</p></div>
            ) : (
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>User</th><th>Email</th><th>Role</th>
                      <th>Status</th><th>Last Login</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr><td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "#555" }}>No users match your filters.</td></tr>
                    ) : filtered.map(user => (
                      <tr key={user.id}>
                        <td>
                          <div className="adm-user-cell">
                            <div className="adm-avatar">
                              {(user.displayName || user.email || "?")[0].toUpperCase()}
                            </div>
                            <span>{user.displayName || "—"}</span>
                          </div>
                        </td>
                        <td className="adm-email">{user.email}</td>
                        <td>
                          <span className={`adm-role-badge ${user.role === "admin" ? "adm-role-admin" : "adm-role-user"}`}>
                            {user.role === "admin" ? "🛡️ Admin" : "👤 User"}
                          </span>
                        </td>
                        <td>
                          <span className={`adm-status-dot ${user.online ? "adm-online" : "adm-offline"}`}>
                            {user.online ? "● Online" : "● Offline"}
                          </span>
                        </td>
                        <td className="adm-time">{timeAgo(user.lastLogin?.seconds)}</td>
                        <td>
                          <div className="adm-actions">
                            <button
                              className={`adm-promote-btn ${user.role === "admin" ? "adm-demote" : ""}`}
                              disabled={pendingIds.has(user.id + "_role")}
                              onClick={() => handleToggleRole(user)}
                            >
                              {user.role === "admin" ? "Demote" : "Promote"}
                            </button>
                            <button
                              className="adm-delete-btn"
                              disabled={pendingIds.has(user.id)}
                              onClick={() => handleDelete(user.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ══ ANALYTICS TAB ══ */}
        {activeTab === "analytics" && (
          analyticsLoading ? (
            <div className="adm-loading"><div className="adm-spinner" /><p>Loading activity data…</p></div>
          ) : allActivity.length === 0 ? (
            <div className="adm-loading" style={{ color: "#555" }}>
              <span style={{ fontSize: 48 }}>📭</span>
              <p>No activity tracked yet.<br />Users need to explore the app first.</p>
            </div>
          ) : (
            <div className="adm-analytics-grid">

              <div className="adm-chart-box">
                <p className="adm-chart-title">🎭 Most Popular Moods</p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={analytics.moods} layout="vertical" barSize={18}>
                    <XAxis type="number" stroke="#555" allowDecimals={false} />
                    <YAxis type="category" dataKey="name" stroke="#888" width={90} />
                    <Tooltip {...tooltipStyle} />
                    <Bar dataKey="count" radius={[0, 6, 6, 0]} fill="#7c6ff7" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="adm-chart-box">
                <p className="adm-chart-title">🗺️ Most Visited States</p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={analytics.states} layout="vertical" barSize={18}>
                    <XAxis type="number" stroke="#555" allowDecimals={false} />
                    <YAxis type="category" dataKey="name" stroke="#888" width={90} />
                    <Tooltip {...tooltipStyle} />
                    <Bar dataKey="count" radius={[0, 6, 6, 0]} fill="#4caf8a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="adm-chart-box">
                <p className="adm-chart-title">🎯 Most Clicked Attractions</p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={analytics.attractions} layout="vertical" barSize={18}>
                    <XAxis type="number" stroke="#555" allowDecimals={false} />
                    <YAxis type="category" dataKey="name" stroke="#888" width={120} />
                    <Tooltip {...tooltipStyle} />
                    <Bar dataKey="count" radius={[0, 6, 6, 0]} fill="#d4b26a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="adm-chart-box">
                <p className="adm-chart-title">⚡ Event Breakdown</p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={analytics.events} layout="vertical" barSize={18}>
                    <XAxis type="number" stroke="#555" allowDecimals={false} />
                    <YAxis type="category" dataKey="name" stroke="#888" width={140} />
                    <Tooltip {...tooltipStyle} />
                    <Bar dataKey="count" radius={[0, 6, 6, 0]} fill="#e67e22" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>
          )
        )}

      </div>
    </div>
  );
}