// Login.jsx
import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`/api/auth/admin/login`, credentials);
      const { token, admin } = res.data;

      // ✅ Save token + admin data
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminData", JSON.stringify(admin));

      // ✅ Callback to parent (optional)
      onLogin?.(token, admin);

      // ✅ No hard redirect needed; App will render dashboard via state
    } catch (err) {
      const apiError =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Login failed. Please check credentials.";
      setError(apiError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sri Furniture Admin</h2>
        <form
          onSubmit={handleSubmit}
          autoComplete={import.meta.env.DEV ? "off" : "on"}
        >
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name={import.meta.env.DEV ? "dev-email" : "username"}
              autoComplete={import.meta.env.DEV ? "off" : "username"}
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name={import.meta.env.DEV ? "dev-password" : "current-password"}
              autoComplete={import.meta.env.DEV ? "new-password" : "current-password"}
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
          </div>

          {error && <div className="error">{error}</div>}

          <button
            type="submit"
            className="btn"
            disabled={loading}
            style={{ width: "100%" }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#7f8c8d",
          }}
        >
          <p>Default Admin:</p>
          <p>Email: admin@shrifurniture.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
