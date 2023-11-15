import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import AllEvents from "./components/AllEvents";
// import { Events } from "./components/Events.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("login") === "true"
  );

  const handleLogout = () => {
    localStorage.setItem("login", "false");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="text-center text-4xl mt-3">All Events</div>
      <AllEvents isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
    </div>
  );
}

export default App;
