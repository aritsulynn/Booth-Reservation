import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, handleLogout }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-neutral-900 p-6">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center">
        <div className="text-white text-xl font-semibold mb-4 md:mb-0">
          <Link to="/" className="text-white hover:text-blue-500">
            Booth Management System | TAN~TAN~
          </Link>
        </div>
        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
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
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  Define Event
                </Link>
              </li>
              <li>
                <div className="relative">
                  <p
                    onClick={handleDropdownToggle}
                    className="flex items-center text-white hover:text-gray-300 transition duration-300 focus:outline-none"
                  >
                    <p className="mr-2">{localStorage.getItem("email")}</p>
                  </p>

                  {isDropdownOpen && (
                    <div className="absolute mt-2 bg-white rounded-md shadow-lg">
                      <ul className="py-2">
                        <li>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 hover:gray-800 bg-white text-black"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
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
