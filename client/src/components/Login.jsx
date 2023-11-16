import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn, isLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email === "" || password === "")
        return alert("Please fill in all fields");
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("login", "true");
        localStorage.setItem("email", email);
        setIsLoggedIn(true);
        navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="mx-auto max-w-md p-8 bg-gradient-to-br from-neutral-900 shadow-lg rounded-md mt-20">
      <form onSubmit={handleSubmit}>
        <h1 className="text-white text-center text-3xl p-2">Login</h1>
        <div className="mb-4">
          <label className="text-white">Email:</label>
          <input
            className="form-input p-2 mt-1 block w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            type="email"
            value={email}
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="text-white">Password:</label>
          <input
            className="form-input p-2 mt-1 block w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            type="password"
            value={password}
            autoComplete="current-password"
            minLength={4}
            maxLength={16}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button
            className="rounded-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline-blue"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>

      <p className="text-center mt-4 text-white">
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
