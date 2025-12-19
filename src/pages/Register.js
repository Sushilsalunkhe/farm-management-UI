import React, { useState } from "react";
import { registerUser } from "../services/api";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser({
        username,
        password,
        role
      });

      setMessage("✅ User registered successfully");
      setUsername("");
      setPassword("");
      setRole("USER");
    } catch (error) {
      setMessage("❌ Registration failed");
    }
  };

  return (
    <div style={{ width: "300px", margin: "50px auto" }}>
      <h2>Register User</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br /><br />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <br /><br />

        <button type="submit">Register</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default Register;
