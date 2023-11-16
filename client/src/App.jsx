import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllEvents from "./components/AllEvents";
import Login from "./components/login.jsx";
import SignUp from "./components/Signup.jsx";
import DefineEvent from "./pages/DefineEvent.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("login") === "true"
  );

  const handleLogout = () => {
    localStorage.setItem("login", "false");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
  };

  const ifnotlogin = () => {
    return (
      <div className="text-5xl text-center mt-5">
        Please <Link to="/login">Login</Link> to see events
      </div>
    );
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="*"
          element={
            isLoggedIn ? (
              <AllEvents isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            ) : (
              ifnotlogin()
            )
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <AllEvents isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            ) : (
              <Login
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
              />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <AllEvents isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            ) : (
              <SignUp
                setIsLoggedIn={setIsLoggedIn}
                handleLogout={handleLogout}
              />
            )
          }
        />
        <Route
          path="/event"
          element={
            isLoggedIn ? (
              <DefineEvent
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
              />
            ) : (
              ifnotlogin()
            )
          }
        />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <AllEvents isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            ) : (
              ifnotlogin()
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
