import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <nav className="bg-neutral-900 p-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-semibold">
          <Link to="/" className="text-white hover:text-blue-500">
            Booth Management System | TAN~TAN~
          </Link>
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
              <li className="">
                <Link
                  to="/event"
                  className=" text-white hover:text-gray-300 transition duration-300"
                >
                  Define Event
                </Link>
              </li>
              <li>
                <Link
                  onClick={handleLogout}
                  className=" text-white hover:text-gray-300 transition duration-300 focus:outline-none"
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
