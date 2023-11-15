import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });

      console.log(res.data); // Assuming the response includes user data

      // Automatically log in and navigate to "/"
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Error signing up. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-md p-8 bg-white shadow-lg rounded-md">
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-gray-700">Name:</span>
          <input
            className="form-input mt-1 block w-full"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Email:</span>
          <input
            className="form-input mt-1 block w-full"
            type="email"
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
          Sign Up
        </button>
      </form>
      <p className="text-center text-xl font-semibold mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Log in here.
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
