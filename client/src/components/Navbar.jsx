import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          <Link to="/">TAN~TAN~</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/"
              className="text-white hover:text-gray-300 transition duration-300"
            >
              Home
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/event">Define Event</Link>
              </li>
              <li>
                <Link onClick={handleLogout} className="text-white">
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
