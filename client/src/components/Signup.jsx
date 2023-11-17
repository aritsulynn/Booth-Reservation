import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUp({ setIsLoggedIn }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      return alert("Please fill in all fields");
    }

    // Password validation using regular expression
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,12}$/;
    if (!passwordRegex.test(password)) {
      return alert(
        "Password must be 4 to 12 characters long and include at least one uppercase letter, one lowercase letter, and one number."
      );
    }

    try {
      const register_res = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          email,
          password,
        }
      );

      console.log(register_res);

      if (register_res.data.success) {
        localStorage.setItem("login", "true");
        localStorage.setItem("email", email);
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto max-w-md p-8 bg-gradient-to-br from-neutral-900 shadow-lg rounded-md mt-20">
      <form onSubmit={handleSubmit}>
        <h1 className="text-white text-center text-3xl p-2">Register</h1>
        <label className="block mb-4">
          <span className="text-white">Name:</span>
          <input
            className="form-input mt-1 block w-full rounded-md p-2"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          <span className="text-white">Email:</span>
          <input
            className="form-input mt-1 block w-full rounded-md p-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          <span className="text-white">Password:</span>
          <input
            className="form-input mt-1 block w-full rounded-md p-2"
            type="password"
            minLength={4}
            maxLength={12}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="text-center">
          <button
            className="rounded-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
      <p className="text-center font-semibold mt-4">
        {" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Already have an account?
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
