import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("login") === "true"
  );

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in when the component mounts
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      console.log(localStorage.getItem("login"));
      localStorage.setItem("login", "true");
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Invalid username or password");
    }
  };

  const handleLogout = () => {
    localStorage.setItem("login", "false");
    setIsLoggedIn(false);
  };

  return (
    <div className="mx-auto max-w-md p-8 bg-white shadow-lg rounded-md">
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-gray-700">Username:</span>
          <input
            className="form-input mt-1 block w-full"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Password:</span>
          <input
            className="form-input mt-1 block w-full"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Login
        </button>
      </form>

      <p className="text-center mt-4">
        Don't have an account?{" "}
        <span
          className="text-blue-500 hover:underline cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </span>
      </p>
    </div>
  );
}

export default Login;
