import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useActivityTracker } from "../hooks/useActivityTracker";
import "./Dashboard.css";


function Dashboard() {
  const navigate = useNavigate();
  const { logEvent } = useActivityTracker();


  const [userName, setUserName] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [mood, setMood] = useState("");
  const [climate, setClimate] = useState("");
  const [country, setCountry] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserName(user.displayName || user.email);

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          // 🕒 Show Last Login
          if (data.lastLogin) {
            setLastLogin(
              new Date(data.lastLogin.seconds * 1000).toLocaleString()
            );
          }

          // 🛡 Check admin role
          if (data.role === "admin") setIsAdmin(true);

          // 🟢 Set Online = true
          await updateDoc(docRef, {
            online: true,
          });
        }

        // 🔴 Set Offline when browser closes
        window.addEventListener("beforeunload", async () => {
          await updateDoc(docRef, {
            online: false,
          });
        });

      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // 🔓 Logout
  const handleLogout = async () => {
    const user = auth.currentUser;

    if (user) {
      await updateDoc(doc(db, "users", user.uid), {
        online: false,
      });
    }

    await signOut(auth);
    navigate("/login");
  };

  const countries = [
    "India",
  ];

  const moods = [
    { name: "Adventurous", desc: "Thrilling experiences & outdoor activities", icon: "🏔️" },
    { name: "Relaxing", desc: "Peaceful retreats & serene landscapes", icon: "🏖️" },
    { name: "Romantic", desc: "Intimate getaways & scenic beauty", icon: "💕" },
    { name: "Cultural", desc: "Rich heritage & local traditions", icon: "🏛️" },
    { name: "Spiritual", desc: "Inner peace & sacred destinations", icon: "🕊️" },
    { name: "Party", desc: "Vibrant nightlife & entertainment", icon: "🎉" },
  ];

  const climates = [
    { name: "Tropical", icon: "🌴" },
    { name: "Cold", icon: "❄️" },
    { name: "Moderate", icon: "🌤️" },
    { name: "Arid/Desert", icon: "🏜️" },
    { name: "Mediterranean", icon: "🌊" },
  ];

  const handleDiscover = () => {
    logEvent("search_started", {
      mood,
      climate,
      country: country === "Any Country" ? "" : country,
    });
    navigate("/results", {
      state: {
        mood,
        climate,
        country: country === "Any Country" ? "" : country,
      },
    });
  };


  return (
    <div className="dashboard-container">

      {/* Logout Button (Design untouched) */}
      <div className="logout-wrapper">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Welcome */}
      {userName && (
        <p className="welcome-text">
          👋 Welcome, {userName}
        </p>
      )}

      {/* Last Login */}
      {lastLogin && (
        <p className="last-login">
          Last login: {lastLogin}
        </p>
      )}

      {/* Saved Trips shortcut */}
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <button
          onClick={() => navigate("/saved-trips")}
          style={{
            background: "none",
            border: "1.5px solid var(--accent)",
            color: "var(--accent)",
            borderRadius: "30px",
            padding: "8px 22px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.25s",
          }}
          onMouseEnter={(e) => { e.target.style.background = "var(--accent-bg)"; }}
          onMouseLeave={(e) => { e.target.style.background = "none"; }}
        >
          ❤️ My Saved Trips
        </button>

        {/* Admin Panel — only visible to admins */}
        {isAdmin && (
          <button
            onClick={() => navigate("/admin")}
            style={{
              background: "none",
              border: "1.5px solid #7c6ff7",
              color: "#b4aeff",
              borderRadius: "30px",
              padding: "8px 22px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "0.25s",
            }}
            onMouseEnter={(e) => { e.target.style.background = "rgba(124,111,247,0.15)"; }}
            onMouseLeave={(e) => { e.target.style.background = "none"; }}
          >
            🛡️ Admin Panel
          </button>
        )}
      </div>

      <h1 className="main-title">Where will your compass point?</h1>
      <p className="subtitle">Tell us what you're looking for</p>

      {/* Mood Section */}
      <h3 className="section-title">WHAT'S YOUR MOOD?</h3>
      <div className="mood-grid">
        {moods.map((item) => (
          <div
            key={item.name}
            className={`mood-card ${mood === item.name ? "active" : ""}`}
            onClick={() => setMood(item.name)}
          >
            <div className="icon">{item.icon}</div>
            <h4>{item.name}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Climate Section */}
      <h3 className="section-title">PREFERRED CLIMATE</h3>
      <div className="climate-row">
        {climates.map((item) => (
          <button
            key={item.name}
            className={`climate-pill ${climate === item.name ? "active" : ""}`}
            onClick={() => setClimate(item.name)}
          >
            <span className="climate-icon">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </div>

      {/* Country Dropdown */}
      <h3 className="section-title">COUNTRY (optional)</h3>
      <div className="custom-dropdown">
        <div
          className="dropdown-header"
          onClick={() => setIsOpen(!isOpen)}
        >
          {country || "Any Country"}
          <span className={`arrow ${isOpen ? "rotate" : ""}`}>⌄</span>
        </div>

        {isOpen && (
          <div className="dropdown-list">
            {countries.map((item) => (
              <div
                key={item}
                className={`dropdown-item ${country === item ? "selected" : ""}`}
                onClick={() => {
                  setCountry(item);
                  setIsOpen(false);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Discover Button */}
      {mood && climate && (
        <div className="discover-wrapper">
          <button
            className="discover-btn"
            onClick={handleDiscover}
          >
            Discover Destinations →
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;