import { useState } from "react";
import "./Login.css";
import farmerImage from "../assets/farmer-login.jpg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/products";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* LEFT IMAGE */}
      <div
        className="login-left"
        style={{ backgroundImage: `url(${farmerImage})` }}
      >
        <div className="overlay">
          <h1>Farm Fresh 🌱</h1>
          <p>Buy directly from farmers. Fresh. Organic. Local.</p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="login-right">
        <h2>Welcome Back 👩‍🌾</h2>
        <p className="subtitle">Login to continue</p>

        {error && <p className="error shake">{error}</p>}

        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;
