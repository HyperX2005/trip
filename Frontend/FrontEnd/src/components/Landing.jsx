import "./Landing.css";
import { Compass, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Landing() {

  const navigate = useNavigate();

  return (
    <div className="hero-section">
      <div className="hero-content">

        <h1 className="hero-title">
          <Compass size={38} strokeWidth={2} className="compass-icon" />
          <span className="trip">TRIP</span>
          <span className="compass">COMPASS</span>
        </h1>

        <p className="hero-subtitle">
          Discover your perfect destination based on your mood, preferred
          climate, and wanderlust
        </p>

        <button 
          className="hero-button"
          onClick={() => navigate("/login")}
        >
          <MapPin size={16} strokeWidth={2} />
          Start Exploring
        </button>

      </div>
    </div>
  );
}

export default Landing;