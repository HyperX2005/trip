import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Results from "./components/Results";
import Admin from "./components/Admin";
import StateDetails from "./components/StateDetails";
import SavedTrips from "./components/SavedTrips";

function App() {
  return (
    <ThemeProvider>
      {/* Global floating theme toggle — visible on every page */}
      <ThemeToggle />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/results" element={<Results />} />
          <Route path="/state/:stateName" element={<StateDetails />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/saved-trips" element={<SavedTrips />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;