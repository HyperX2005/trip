import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useSavedTrips } from "../hooks/useSavedTrips";
import "./SavedTrips.css";

const CATEGORY_ICONS = {
  Spiritual: "🛕",
  Beach: "🏖️",
  Waterfall: "💧",
  Backwater: "🚣",
  "Tea Plantation": "🌿",
  "Hill Station": "⛰️",
};

export default function SavedTrips() {
  const navigate = useNavigate();
  const { savedTrips, loading, removeTrip } = useSavedTrips();

  /* Redirect if not logged in */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
    });
    return () => unsub();
  }, [navigate]);

  const handleCardClick = (trip) => {
    navigate(`/state/${trip.stateName}`, { state: { mood: trip.mood } });
  };

  return (
    <div className="st-page">
      {/* Header */}
      <div className="st-header">
        <button className="st-back" onClick={() => navigate("/dashboard")}>← Back</button>
        <div className="st-logo">🧭 TRIPCOMPASS</div>
      </div>

      <h1 className="st-title">❤️ My Saved Trips</h1>
      <p className="st-sub">Your personal collection of favourite destinations &amp; attractions</p>

      {loading && (
        <div className="st-loading">
          <div className="st-spinner" />
          <p>Loading your trips…</p>
        </div>
      )}

      {!loading && savedTrips.length === 0 && (
        <div className="st-empty">
          <div className="st-empty-icon">🗺️</div>
          <h2>No saved trips yet</h2>
          <p>Tap the ❤️ on any destination or attraction to save it here.</p>
          <button className="st-explore-btn" onClick={() => navigate("/dashboard")}>
            Explore Destinations →
          </button>
        </div>
      )}

      {!loading && savedTrips.length > 0 && (
        <>
          {/* Stats bar */}
          <div className="st-stats-bar">
            <span className="st-stat">📍 {savedTrips.filter(t => !t.attractionName).length} States</span>
            <span className="st-stat">🎯 {savedTrips.filter(t => !!t.attractionName).length} Attractions</span>
          </div>

          <div className="st-grid">
            {savedTrips.map((trip) => (
              <div
                key={trip.id}
                className="st-card"
                onClick={() => handleCardClick(trip)}
              >
                {/* Image */}
                <div className="st-card-img-wrap">
                  <img src={trip.image} alt={trip.attractionName || trip.stateName} />
                  <div className="st-card-overlay">
                    <span className="st-card-state">{trip.stateName}</span>
                  </div>
                  {/* Category tag */}
                  {trip.category && (
                    <span className="st-category-badge">
                      {CATEGORY_ICONS[trip.category] || "📍"} {trip.category}
                    </span>
                  )}
                  {/* Remove button */}
                  <button
                    className="st-remove-btn"
                    title="Remove from saved"
                    onClick={(e) => { e.stopPropagation(); removeTrip(trip.id); }}
                  >
                    ✕
                  </button>
                </div>

                {/* Content */}
                <div className="st-card-content">
                  <h3 className="st-card-name">
                    {trip.attractionName || trip.stateName}
                  </h3>
                  {trip.attractionName && (
                    <p className="st-card-state-label">📍 {trip.stateName}</p>
                  )}
                  {trip.description && (
                    <p className="st-card-desc">{trip.description}</p>
                  )}
                  <div className="st-card-footer">
                    <span className="st-card-type">
                      {trip.attractionName ? "Attraction" : "Destination"}
                    </span>
                    <span className="st-view-link">View Details →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
