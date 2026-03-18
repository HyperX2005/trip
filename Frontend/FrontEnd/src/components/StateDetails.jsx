import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { southIndiaDestinations } from "../data/destinations";
import { useTheme } from "../context/ThemeContext";
import { useSavedTrips } from "../hooks/useSavedTrips";
import { useActivityTracker } from "../hooks/useActivityTracker";

import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
  InfoWindow,
} from "@react-google-maps/api";
import "./StateDetails.css";


const LIBRARIES = ["places"];
const OW_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const GM_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const POI_TYPES = [
  { type: "hospital", emoji: "🏥", label: "Hospital", color: "#e74c3c" },
  { type: "lodging", emoji: "🏨", label: "Hotel", color: "#9b59b6" },
  { type: "restaurant", emoji: "🍽️", label: "Restaurant", color: "#f39c12" },
  { type: "gas_station", emoji: "⛽", label: "Petrol Pump", color: "#27ae60" },
];

function weatherEmoji(main = "") {
  const m = main.toLowerCase();
  if (m.includes("thunder")) return "⛈";
  if (m.includes("rain") || m.includes("drizzle")) return "🌧";
  if (m.includes("snow")) return "❄️";
  if (m.includes("clear")) return "☀️";
  if (m.includes("cloud")) return "⛅";
  if (m.includes("mist") || m.includes("fog") || m.includes("haze")) return "🌫";
  return "🌤";
}

function sampleRoutePoints(result, count = 6) {
  const steps = result.routes[0].legs[0].steps;
  const pts = [];
  steps.forEach((s) => { pts.push(s.start_location); pts.push(s.end_location); });
  const sampled = [];
  const stride = Math.max(1, Math.floor(pts.length / count));
  for (let i = 0; i < pts.length && sampled.length < count; i += stride)
    sampled.push({ lat: pts[i].lat(), lng: pts[i].lng() });
  return sampled;
}

function makePinSvg(emoji, bgColor) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="48" viewBox="0 0 40 48">
    <ellipse cx="20" cy="45" rx="8" ry="3" fill="rgba(0,0,0,0.25)"/>
    <path d="M20 0 C9 0 0 9 0 20 C0 33 20 48 20 48 C20 48 40 33 40 20 C40 9 31 0 20 0Z"
          fill="${bgColor}" stroke="white" stroke-width="2"/>
    <text x="20" y="27" text-anchor="middle" font-size="18">${emoji}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const USER_PIN = makePinSvg("📍", "#1a73e8");
const DEST_PIN = makePinSvg("🏁", "#d4b26a");

/* ---- Auto-detect nearby service type from name ---- */
function serviceIcon(name = "") {
  const n = name.toLowerCase();
  if (n.includes("hospital") || n.includes("medical") || n.includes("health") || n.includes("clinic") || n.includes("phc")) return "🏥";
  if (n.includes("petrol") || n.includes("pump") || n.includes("bpcl") || n.includes("iocl") || n.includes("hp ") || n.includes("fuel")) return "⛽";
  if (n.includes("hotel") || n.includes("resort") || n.includes("inn") || n.includes("lodge") || n.includes("palace") || n.includes("estate")) return "🏨";
  if (n.includes("restaurant") || n.includes("kitchen") || n.includes("café") || n.includes("cafe") || n.includes("bhavan") || n.includes("food") || n.includes("wharf") || n.includes("plantation café")) return "🍽️";
  if (n.includes("pharmacy") || n.includes("pharmacist") || n.includes("drug")) return "💊";
  return "📍";
}

/* -----------------------------------------------------------
   Mood → Category mapping
   Tells StateDetails which attraction categories to show
   when the user arrives from a specific Dashboard mood.
----------------------------------------------------------- */
const MOOD_TO_CATEGORIES = {
  Spiritual: ["Spiritual"],
  Relaxing: ["Waterfall", "Beach", "Wildlife", "Hill Station", "Backwater", "Tea Plantation"],
  Party: ["Beach"],
  Adventurous: ["Wildlife", "Waterfall", "Peak", "Hill Station", "Backwater"],
  Romantic: ["Beach", "Hill Station", "Waterfall", "Peak", "Backwater"],
  Cultural: ["Cultural", "Spiritual", "Tea Plantation", "Backwater"],
};



/* ========================================================= */
function StateDetails() {
  const { stateName } = useParams();
  const location = useLocation();
  const { theme } = useTheme();

  // Mood passed from Results page (may be absent if user navigated directly)
  const { mood: selectedMood = "" } = location.state || {};

  // Saved trips hook
  const { isSaved, saveTrip, removeTrip } = useSavedTrips();

  // Activity tracker
  const { logEvent } = useActivityTracker();


  const state = southIndiaDestinations.find(
    (item) => item.state.toLowerCase() === stateName.toLowerCase()
  );

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GM_KEY,
    libraries: LIBRARIES,
  });

  /* ---------- State ---------- */
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle");
  const [directions, setDirections] = useState(null);
  const [routeStatus, setRouteStatus] = useState("idle");
  const [routeError, setRouteError] = useState("");
  const [pois, setPois] = useState([]);
  const [activeInfo, setActiveInfo] = useState(null);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [destination, setDestination] = useState(null);

  /* Manual location feature */
  const [showManual, setShowManual] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [geocodedOrigin, setGeocodedOrigin] = useState(""); // what GPS resolved to

  /* Live weather */
  const [weather, setWeather] = useState(null);

  const userLocationRef = useRef(null);
  const mapRef = useRef(null);
  const mapSection = useRef(null);

  /* ---------- Get user GPS location ---------- */
  useEffect(() => {
    setLocationStatus("loading");
    if (!navigator.geolocation) { setLocationStatus("denied"); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        userLocationRef.current = loc;
        setLocationStatus("acquired");
      },
      () => setLocationStatus("denied"),
      { timeout: 12000, maximumAge: 60000 }
    );
  }, []);

  /* ---------- Fetch live weather ---------- */
  useEffect(() => {
    if (!state?.coordinates) return;
    const { lat, lng } = state.coordinates;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OW_KEY}&units=metric`)
      .then((r) => r.json())
      .then((d) => {
        if (d.main) setWeather({
          temp: Math.round(d.main.temp),
          feelsLike: Math.round(d.main.feels_like),
          humidity: d.main.humidity,
          description: d.weather[0].description,
          main: d.weather[0].main,
          icon: d.weather[0].icon,
          wind: Math.round((d.wind?.speed || 0) * 3.6),
          tempMin: Math.round(d.main.temp_min),
          tempMax: Math.round(d.main.temp_max),
        });
      })
      .catch(() => { });
  }, [state]);

  /* ---------- POI search along route ---------- */
  const searchPoisAlongRoute = useCallback((result) => {
    if (!mapRef.current) return;
    const service = new window.google.maps.places.PlacesService(mapRef.current);
    const samples = sampleRoutePoints(result, 6);
    const allPois = [];
    let pending = samples.length * POI_TYPES.length;
    const finish = () => {
      pending--;
      if (pending === 0) {
        const seen = new Set();
        setPois(allPois.filter((p) => { if (seen.has(p.place_id)) return false; seen.add(p.place_id); return true; }));
      }
    };
    samples.forEach((pt) => {
      POI_TYPES.forEach((poiType) => {
        service.nearbySearch(
          { location: pt, radius: 8000, type: poiType.type },
          (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results)
              results.slice(0, 2).forEach((place) => allPois.push({
                ...place, poiType,
                position: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
              }));
            finish();
          }
        );
      });
    });
  }, []);

  /* ---------- Core DirectionsService call ---------- */
  // Both origin and destination are now ADDRESS STRINGS.
  // Passing raw lat/lng for water bodies / natural sites causes ZERO_RESULTS
  // because the coordinates land in the water with no road access.
  const executeRoute = useCallback(
    (originStr, destStr) => {
      new window.google.maps.DirectionsService().route(
        {
          origin: originStr,
          destination: destStr,
          travelMode: window.google.maps.TravelMode.DRIVING,
          avoidFerries: false,
          avoidHighways: false,
          avoidTolls: false,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
            setRouteStatus("done");
            searchPoisAlongRoute(result);
          } else {
            console.error("❌ DirectionsService:", status, "| origin:", originStr, "| dest:", destStr);
            setRouteStatus("error");
            setRouteError(status);
            // Auto-open manual input whenever routing fails so user can type their city
            setShowManual(true);
          }
        }
      );
    },
    [searchPoisAlongRoute]
  );

  /* ---------- Run Directions API — origin geocoded, destination is place name string ---------- */
  const runDirections = useCallback(
    (origin, dest) => {
      if (!dest || !isLoaded) return;
      setRouteStatus("loading");
      setRouteError("");
      setPois([]);
      setActiveInfo(null);
      setShowManual(false); // reset each attempt

      const destStr = dest.placeName; // e.g. "Alleppey Backwaters, Kerala, India"

      if (!origin) {
        // No GPS at all — open manual input right away
        setRouteStatus("error");
        setRouteError("NO_GPS");
        setShowManual(true);
        return;
      }

      if (typeof origin === "object" && origin.lat !== undefined) {
        // GPS coords → geocode to nearest road address
        new window.google.maps.Geocoder().geocode(
          { location: { lat: origin.lat, lng: origin.lng } },
          (results, geoStatus) => {
            if (geoStatus === "OK" && results && results.length > 0) {
              const originStr = results[0].formatted_address;
              console.log("📍 GPS geocoded to:", originStr, "→", destStr);
              setGeocodedOrigin(originStr);
              executeRoute(originStr, destStr);
            } else {
              const fallback = `${origin.lat},${origin.lng}`;
              console.warn("Geocoder failed, using:", fallback);
              setGeocodedOrigin(fallback);
              executeRoute(fallback, destStr);
            }
          }
        );
      } else {
        // Manual text already a string
        setGeocodedOrigin(String(origin));
        executeRoute(origin, destStr);
      }
    },
    [isLoaded, executeRoute]
  );

  /* ---------- Attraction card click — use GPS ---------- */
  const handleAttractionClick = useCallback(
    (place) => {
      if (!isLoaded) return;
      setSelectedAttraction(place);
      setDirections(null);
      setPois([]);
      setRouteStatus("idle");
      setRouteError("");
      setTimeout(() => mapSection.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);

      // Log the click
      logEvent("attraction_clicked", {
        attractionName: place.name,
        category: place.category || "",
        stateName: state?.state || "",
        mood: selectedMood,
      });

      const dest = {
        lat: place.coordinates.lat,
        lng: place.coordinates.lng,
        name: place.name,
        placeName: `${place.name}, ${state.state}, India`,
      };
      setDestination(dest);

      // Log route request
      logEvent("route_requested", {
        attractionName: place.name,
        stateName: state?.state || "",
        destinationAddress: `${place.name}, ${state.state}, India`,
      });

      runDirections(userLocationRef.current, dest);
    },
    [isLoaded, runDirections, state, logEvent, selectedMood]
  );

  /* ---------- Manual location submit ---------- */
  const handleManualRoute = useCallback(() => {
    if (!manualInput.trim() || !destination) return;
    runDirections(manualInput.trim(), destination);
  }, [manualInput, destination, runDirections]);

  /* ---------- Group pois ---------- */
  const groupedPois = POI_TYPES.map((pt) => ({
    ...pt,
    places: pois.filter((p) => p.poiType.type === pt.type).slice(0, 3),
  })).filter((g) => g.places.length > 0);


  if (!state) return <div className="state-page" style={{ padding: "4rem", textAlign: "center" }}>State not found.</div>;
  if (loadError) return <div className="state-page" style={{ padding: "4rem", textAlign: "center" }}>❌ Maps failed to load.</div>;

  /* ---- Derive filtered attractions from selected mood ---- */
  const matchingCategories = MOOD_TO_CATEGORIES[selectedMood] || [];
  const filteredAttractions = matchingCategories.length > 0
    ? (state.attractions || []).filter((a) => matchingCategories.includes(a.category))
    : (state.attractions || []);
  // If filter produces nothing (state has no matching category), show all
  const attractionsToShow = filteredAttractions.length > 0 ? filteredAttractions : (state.attractions || []);


  const mapCenter = destination
    ? { lat: destination.lat, lng: destination.lng }
    : { lat: state.coordinates.lat, lng: state.coordinates.lng };

  const currentMapStyles = theme === "light" ? lightMapStyles : darkMapStyles;

  const errorHint = (s) => {
    if (s === "REQUEST_DENIED") return "REQUEST_DENIED — ensure Directions API billing is enabled.";
    if (s === "ZERO_RESULTS") return "ZERO_RESULTS — no drivable road found. Try entering a city manually below.";
    return s || "Unknown routing error";
  };

  return (
    <div className="state-page">

      {/* ================= HERO ================= */}
      <div className="state-hero">
        <img src={state.image} alt={state.state} />
        <div className="hero-overlay">
          <h1>{state.state}</h1>
          <p>{state.description}</p>
        </div>
        <div className="info-card">
          {weather ? (
            <>
              <div className="icard-weather-main">
                <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description} className="icard-weather-icon" />
                <div>
                  <div className="icard-temp">{weather.temp}°C</div>
                  <div className="icard-desc">{weatherEmoji(weather.main)} {weather.description}</div>
                </div>
              </div>
              <div className="icard-row">🌡 {weather.tempMin}° – {weather.tempMax}°C</div>
              <div className="icard-row">💧 Humidity: {weather.humidity}%</div>
              <div className="icard-row">🌬 Wind: {weather.wind} km/h</div>
              <div className="icard-row">🌡 Feels like: {weather.feelsLike}°C</div>
            </>
          ) : (
            <>
              <div className="icard-row">🌡 {state.temperature}</div>
              <div className="icard-row">☁ {state.weather}</div>
            </>
          )}
        </div>
      </div>

      {/* ================= HAZARDS ================= */}
      <section className="section">
        <h2>⚠ Recent Hazards &amp; Advisories</h2>
        <div className="hazard-list">
          {state.hazards?.map((h, i) => <span key={i} className="hazard-pill">{h}</span>)}
        </div>
      </section>

      {/* ================= ATTRACTIONS ================= */}
      <section className="section">
        <h2>👁 Sightseeing Places</h2>

        {/* Active mood filter indicator */}
        {selectedMood && matchingCategories.length > 0 && (
          <div className="mood-filter-bar">
            <span className="mood-filter-chip">
              🎯 Filtered by: <strong>{selectedMood}</strong>
            </span>
            <span className="mood-filter-count">
              {attractionsToShow.length} of {state.attractions?.length || 0} places
            </span>
            {attractionsToShow.length < (state.attractions?.length || 0) && (
              <span className="mood-filter-categories">
                {matchingCategories.map(c => <span key={c} className="mfc-pill">{c}</span>)}
              </span>
            )}
          </div>
        )}

        <p className="route-sub">Click any place to see the live route &amp; stops on the map ↓</p>
        {attractionsToShow.map((place, index) => (

          <div
            key={index}
            className={`attraction-card clickable ${selectedAttraction?.name === place.name ? "active-attraction" : ""}`}
            onClick={() => handleAttractionClick(place)}
          >
            {/* Left: place image */}
            <div className="ac-image-wrap">
              <img src={place.image} alt={place.name} />
              <span className="route-badge ac-badge">🗺 View Route</span>

              {/* Heart / save button */}
              {(() => {
                const { saved, docId } = isSaved(state.state, place.name);
                return (
                  <button
                    className={`ac-heart-btn ${saved ? "ac-heart-saved" : ""}`}
                    title={saved ? "Remove from Saved Trips" : "Save this attraction"}
                    onClick={(e) => {
                      e.stopPropagation();
                      saved
                        ? removeTrip(docId)
                        : saveTrip({
                          type: "attraction",
                          stateName: state.state,
                          attractionName: place.name,
                          category: place.category || "",
                          image: place.image,
                          description: place.description,
                        });
                    }}
                  >
                    {saved ? "❤️" : "🤍"}
                  </button>
                );
              })()}
            </div>


            {/* Right: info */}
            <div className="attraction-content">
              <h3 className="ac-title">{place.name}</h3>
              <p className="ac-desc">{place.description}</p>

              {place.nearby?.length > 0 && (
                <>
                  <p className="nearby-label">NEARBY SERVICES</p>
                  <div className="nearby-grid">
                    {place.nearby.map((s, i) => {
                      const icon = serviceIcon(s.name);
                      return (
                        <div key={i} className="svc-item">
                          <span className="svc-icon">{icon}</span>
                          <div className="svc-info">
                            <span className="svc-name">{s.name}</span>
                            <span className="svc-dist">{s.distance}</span>
                          </div>
                          {s.rating && (
                            <span className="svc-rating">★ {s.rating}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </section>


      {/* ================= DYNAMIC ON YOUR ROUTE ================= */}
      {selectedAttraction && routeStatus !== "idle" && (
        <section className="section">
          <h2 className="route-title">🧭 On Your Route</h2>
          <p className="route-sub">Places along your drive to <strong>{selectedAttraction.name}</strong></p>
          {(routeStatus === "loading" || (routeStatus === "done" && groupedPois.length === 0)) && (
            <p className="route-sub" style={{ opacity: 0.5 }}>
              {routeStatus === "loading" ? "⏳ Calculating route…" : "Searching for places along route…"}
            </p>
          )}
          {groupedPois.length > 0 && (
            <div className="route-list">
              <div className="route-start">
                <div className="route-dot start-dot"></div>
                <span>Your Location</span>
              </div>
              {groupedPois.map((group) =>
                group.places.map((poi, i) => (
                  <div key={poi.place_id || i} className="route-item">
                    <div className="route-dot"></div>
                    <div className="route-card clickable" onClick={() => {
                      setActiveInfo(poi);
                      mapRef.current?.panTo(poi.position);
                      mapRef.current?.setZoom(15);
                      setTimeout(() => mapSection.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
                    }}>
                      <div className="route-left">
                        <span className="route-icon">{group.emoji}</span>
                        <div className="route-text">
                          <div className="route-name">{poi.name}</div>
                          <div className="route-distance">{poi.vicinity}</div>
                        </div>
                      </div>
                      {poi.rating && <div className="route-rating">⭐ {poi.rating}</div>}
                    </div>
                  </div>
                ))
              )}
              <div className="route-end">
                <div className="route-dot end-dot"></div>
                <span>{selectedAttraction.name}</span>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ================= GOOGLE MAP ================= */}
      <section className="section" ref={mapSection}>
        <h2>🗺 {selectedAttraction ? `Route to ${selectedAttraction.name}` : "Live Route & Map"}</h2>

        {/* Status chips */}
        <div className="map-controls">
          <div className={`location-chip chip-${locationStatus}`}>
            {locationStatus === "idle" && "📍 Waiting for location…"}
            {locationStatus === "loading" && "📡 Detecting your location…"}
            {locationStatus === "acquired" && "✅ GPS location acquired"}
            {locationStatus === "denied" && "❌ Location denied — type your city below"}
          </div>

          {/* Debug: show the geocoded origin address */}
          {geocodedOrigin && routeStatus !== "idle" && (
            <span className="route-hint" style={{ fontSize: "12px" }}>
              📌 Routing from: <em>{geocodedOrigin}</em>
            </span>
          )}

          {!selectedAttraction && <span className="route-hint">👆 Click a sightseeing place above to start routing</span>}
          {routeStatus === "loading" && <span className="route-loading-chip">⏳ Calculating route…</span>}
          {routeStatus === "done" && <span className="route-done-chip">✅ Route ready — {pois.length} places found</span>}
          {routeStatus === "error" && (
            <span className="route-error">
              {routeError === "NO_GPS"
                ? "⚠ No GPS detected — type your city/address below"
                : `⚠ ${errorHint(routeError)}`}
            </span>
          )}

          {/* Manual input toggle */}
          {selectedAttraction && (
            <button className="manual-toggle" onClick={() => setShowManual((v) => !v)}>
              {showManual ? "▲ Hide manual location" : "✏️ Enter location manually"}
            </button>
          )}
        </div>

        {/* ---- Manual Location Input ---- */}
        {showManual && selectedAttraction && (
          <div className="manual-origin-box">
            <p className="manual-origin-label">
              📌 Type your starting city or address to override GPS routing:
            </p>
            <div className="manual-origin-row">
              <input
                className="manual-origin-input"
                type="text"
                placeholder="e.g. Chennai, Tamil Nadu"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleManualRoute()}
              />
              <button
                className="route-btn"
                onClick={handleManualRoute}
                disabled={!manualInput.trim() || routeStatus === "loading"}
              >
                🗺 Get Route
              </button>
            </div>
          </div>
        )}

        {/* POI Legend */}
        {pois.length > 0 && (
          <div className="poi-legend">
            {POI_TYPES.map((t) => (
              <span key={t.type} className="poi-pill" style={{ borderColor: t.color }}>
                {t.emoji} {t.label}
              </span>
            ))}
            <span className="poi-count">{pois.length} places along route</span>
          </div>
        )}

        {/* Map */}
        <div className="map-wrapper">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={mapCenter}
              zoom={selectedAttraction ? 9 : 7}
              options={{ styles: currentMapStyles, zoomControl: true, streetViewControl: false, mapTypeControl: false, fullscreenControl: true }}
              onLoad={(map) => { mapRef.current = map; }}
            >
              {userLocation && (
                <Marker position={userLocation} icon={{ url: USER_PIN, scaledSize: new window.google.maps.Size(40, 48) }} title="Your Location" zIndex={100} />
              )}
              {destination && (
                <Marker position={{ lat: destination.lat, lng: destination.lng }} icon={{ url: DEST_PIN, scaledSize: new window.google.maps.Size(40, 48) }} title={destination.name} zIndex={99} />
              )}
              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{ suppressMarkers: true, polylineOptions: { strokeColor: "#d4b26a", strokeWeight: 5, strokeOpacity: 0.85 } }}
                />
              )}
              {pois.map((poi) => (
                <Marker key={poi.place_id} position={poi.position}
                  icon={{ url: makePinSvg(poi.poiType.emoji, poi.poiType.color), scaledSize: new window.google.maps.Size(34, 40) }}
                  title={poi.name} onClick={() => setActiveInfo(poi)} zIndex={50}
                />
              ))}
              {activeInfo && (
                <InfoWindow position={activeInfo.position} onCloseClick={() => setActiveInfo(null)}>
                  <div className="info-window">
                    <div className="iw-icon">{activeInfo.poiType.emoji}</div>
                    <div className="iw-name">{activeInfo.name}</div>
                    {activeInfo.rating && <div className="iw-rating">⭐ {activeInfo.rating}</div>}
                    <div className="iw-type">{activeInfo.poiType.label}</div>
                    {activeInfo.vicinity && <div className="iw-address">{activeInfo.vicinity}</div>}
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          ) : (
            <div className="map-loading">Loading map…</div>
          )}
        </div>
      </section>
    </div>
  );
}

/* ---- Dark map style ---- */
const darkMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#0d2b1e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0d2b1e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#a5c9b0" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#1a4530" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#0a2818" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#c8d8c0" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#2a6040" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1a3820" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#d4b26a" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#081a12" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d7a5a" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#102b1d" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#0e2a1c" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#6aad86" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#0d2b1e" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#2c6b52" }] },
  { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#4a9970" }] },
];

/* ---- Light map style (clean, warm) ---- */
const lightMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#f5ede0" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5ede0" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#3a2a12" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#e8d5b5" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#d5c09a" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#5a3e1c" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#c9952d" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#b8832a" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#6b3d00" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#b0d4e8" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#1a5a7a" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#dce8d0" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#c8e0b8" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#2a5a1a" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#e0d0b8" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#c8a870" }] },
];

export default StateDetails;
