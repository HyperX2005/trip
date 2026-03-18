import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { southIndiaDestinations } from "../data/destinations";
import { useSavedTrips } from "../hooks/useSavedTrips";
import { useActivityTracker } from "../hooks/useActivityTracker";
import "./Results.css";


const OW_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

/* ---- Weather condition → emoji mapping ---- */
function weatherEmoji(main) {
  const m = (main || "").toLowerCase();
  if (m.includes("thunder")) return "⛈";
  if (m.includes("rain") || m.includes("drizzle")) return "🌧";
  if (m.includes("snow")) return "❄️";
  if (m.includes("clear")) return "☀️";
  if (m.includes("cloud")) return "⛅";
  if (m.includes("mist") || m.includes("fog") || m.includes("haze")) return "🌫";
  return "🌤";
}

/* ---- LiveWeather: fetches real-time data for one place ---- */
function LiveWeather({ lat, lng }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lat || !lng) return;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OW_KEY}&units=metric`
    )
      .then((r) => r.json())
      .then((d) => {
        if (d.main) {
          setData({
            temp: Math.round(d.main.temp),
            feelsLike: Math.round(d.main.feels_like),
            humidity: d.main.humidity,
            description: d.weather[0].description,
            main: d.weather[0].main,
            icon: d.weather[0].icon,
            wind: Math.round((d.wind?.speed || 0) * 3.6),
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [lat, lng]);

  if (loading) return <div className="weather-skeleton">Loading weather…</div>;
  if (!data) return null;

  return (
    <div className="live-weather-row">
      <div className="lw-main">
        <img
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={data.description}
          className="lw-icon"
        />
        <span className="lw-temp">{data.temp}°C</span>
        <span className="lw-desc">{weatherEmoji(data.main)} {data.description}</span>
      </div>
      <div className="lw-details">
        <span>💧 {data.humidity}%</span>
        <span>🌬 {data.wind} km/h</span>
        <span>🌡 Feels {data.feelsLike}°C</span>
      </div>
    </div>
  );
}

/* ======================================================= */
function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mood = "", climate = "", country = "" } = location.state || {};
  const { isSaved, saveTrip, removeTrip } = useSavedTrips();
  const { logEvent } = useActivityTracker();



  const filteredDestinations = southIndiaDestinations.filter((place) => {
    const moodMatch = mood ? place.moods?.includes(mood) : true;
    const climateMatch = climate ? place.climates?.includes(climate) : true;
    const countryMatch = country ? place.country === country : true;
    return moodMatch && climateMatch && countryMatch;
  });

  return (
    <div className="results-container">
      {/* Header */}
      <div className="results-header">
        <span className="back-btn" onClick={() => navigate("/dashboard")}>← Back</span>
        <div className="logo">🧭 TRIPCOMPASS</div>
      </div>

      <h1 className="results-title">Top Destinations For You</h1>

      {/* Saved trips shortcut */}
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <button
          className="filter-chip"
          style={{ cursor: "pointer", border: "1px solid var(--accent)", background: "var(--accent-bg)", color: "var(--accent)", padding: "6px 18px", borderRadius: "20px", fontSize: "13px", fontWeight: 600 }}
          onClick={() => navigate("/saved-trips")}
        >
          ❤️ My Saved Trips
        </button>
      </div>

      {/* Active Filters */}
      <div className="filters">
        {mood && <span className="filter-chip">{mood}</span>}
        {climate && <span className="filter-chip">{climate}</span>}
        {country && <span className="filter-chip">📍 {country}</span>}
      </div>

      {filteredDestinations.length === 0 && (
        <p className="no-results">No destinations match your preferences.</p>
      )}

      {/* Cards */}
      <div className="card-grid">
        {filteredDestinations.map((place) => (
          <div
            key={place.id || place.state}
            className="destination-card"
            onClick={() => {
              if (!place.state) return;
              logEvent("state_visited", {
                stateName: place.state,
                mood,
                climate,
              });
              navigate(`/state/${place.state}`, { state: { mood, climate } });
            }}
          >
            {/* Image */}
            <div className="image-wrapper">
              <img src={place.image} alt={place.state} loading="lazy" />

              {/* Heart / Save button */}
              {(() => {
                const { saved, docId } = isSaved(place.state);
                return (
                  <button
                    className={`heart-btn ${saved ? "heart-saved" : ""}`}
                    title={saved ? "Remove from Saved Trips" : "Save this destination"}
                    onClick={(e) => {
                      e.stopPropagation();
                      saved
                        ? removeTrip(docId)
                        : saveTrip({
                          type: "state",
                          stateName: place.state,
                          image: place.image,
                          description: place.description,
                          mood,
                        });
                    }}
                  >
                    {saved ? "❤️" : "🤍"}
                  </button>
                );
              })()}

              <div className="image-overlay">
                <h3>{place.state}</h3>
                <p>📍 {place.state}, India</p>
              </div>
            </div>

            {/* Content */}
            <div className="card-content">
              <p className="description">{place.description}</p>

              {/* ---- Live Weather ---- */}
              {place.coordinates && (
                <LiveWeather lat={place.coordinates.lat} lng={place.coordinates.lng} />
              )}


            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;