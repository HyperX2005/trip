import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle theme"
    >
      <div className={`toggle-track ${isDark ? "track-dark" : "track-light"}`}>
        <div className="toggle-thumb">
          <span className="toggle-icon">{isDark ? "🌙" : "☀️"}</span>
        </div>
      </div>
    </button>
  );
}
