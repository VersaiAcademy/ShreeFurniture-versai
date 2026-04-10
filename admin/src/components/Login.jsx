// Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`/api/auth/admin/login`, credentials);
      const { token, admin } = res.data;

      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminData", JSON.stringify(admin));

      onLogin?.(token, admin);
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

  // Inline CSS styles
  const styles = {
    passwordWrapper: {
      position: "relative",
      width: "100%",
    },
    passwordInput: {
      width: "100%",
      paddingRight: "40px",
      boxSizing: "border-box",
    },
    eyeIcon: {
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
      margin: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#7f8c8d",
      transition: "color 0.2s ease",
    },
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
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name={import.meta.env.DEV ? "dev-password" : "current-password"}
                autoComplete={import.meta.env.DEV ? "new-password" : "current-password"}
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                style={styles.passwordInput}
                required
              />
              <button
                type="button"
                style={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
                onMouseEnter={(e) => e.currentTarget.style.color = "#2c3e50"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#7f8c8d"}
                onFocus={(e) => e.currentTarget.style.color = "#e67e22"}
                onBlur={(e) => e.currentTarget.style.color = "#7f8c8d"}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
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