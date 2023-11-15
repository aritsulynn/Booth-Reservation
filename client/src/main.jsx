import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Login from "./components/login.jsx";
import SignUp from "./components/Signup.jsx";
import DefineEvent from "./pages/DefineEvent.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/event" element={<DefineEvent />} />
    </Routes>
  </BrowserRouter>
);
