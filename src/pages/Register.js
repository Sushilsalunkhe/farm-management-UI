import React, { useState } from "react";
import "./Register.css";
import { registerUser } from "../services/api";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await registerUser({ username, password, role });

      setMessage("✅ User registered successfully");
      setUsername("");
      setPassword("");
      setRole("USER");
    } catch (err) {
      setError("❌ Registration failed. Try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account 🌱</h2>
        <p className="subtitle">Join Farm Store today</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button type="submit">Register</button>
        </form>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default Register;
