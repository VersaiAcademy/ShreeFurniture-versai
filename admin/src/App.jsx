// App.jsx
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Categories from "./components/Categories";
import Orders from "./components/Orders";
import Banners from "./components/Banners";
import { safeJSONParse } from "./utils/safeJSONParse";

const App = () => {
  const readStoredAdmin = () => {
    const token = localStorage.getItem("adminToken");
    const parsed = safeJSONParse(localStorage.getItem("adminData"));
    return { token, admin: parsed };
  };

  const boot = readStoredAdmin();
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(boot.token && boot.admin)
  );
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [admin, setAdmin] = useState(boot.admin);
  const [validating, setValidating] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const parsed = safeJSONParse(localStorage.getItem("adminData"));
    if (!token || !parsed) {
      setValidating(false);
      return;
    }

    // Validate token silently
    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (r) => {
        if (r.ok) {
          setIsLoggedIn(true);
          setAdmin(parsed);
        } else {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminData");
          setIsLoggedIn(false);
          setAdmin(null);
        }
      })
      .catch(() => {
        // Network issue → don’t force logout in dev
      })
      .finally(() => setValidating(false));
  }, []);

  const handleLogin = (token, adminData) => {
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminData", JSON.stringify(adminData));
    setIsLoggedIn(true);
    setAdmin(adminData);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    setIsLoggedIn(false);
    setAdmin(null);
    setCurrentPage("dashboard");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onNavigate={setCurrentPage} />;
      case "banners":
        return <Banners />;
      case "products":
        return <Products />;
      case "categories":
        return <Categories />;
      case "orders":
        return <Orders />;
      default:
        return <Dashboard />;
    }
  };

  if (validating) {
    return (
      <div style={{ textAlign: "center", paddingTop: "100px" }}>
        <h3>Checking Admin Session...</h3>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "#2c3e50",
          color: "white",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div style={{ padding: "20px", borderBottom: "1px solid #34495e" }}>
          <h2 style={{ margin: 0, fontSize: "18px" }}>Shri Furniture Admin</h2>
          <p style={{ margin: "5px 0 0 0", fontSize: "12px", opacity: 0.8 }}>
            Welcome, {admin?.name || "Admin"}
          </p>
        </div>

        <nav style={{ flex: 1 }}>
          {[
            { key: "dashboard", label: "📊 Dashboard" },
            { key: "banners", label: "🖼️ Banners" },
            { key: "products", label: "📦 Products" },
            { key: "categories", label: "📂 Categories" },
            { key: "orders", label: "📋 Orders" },
          ].map((item) => (
            <div
              key={item.key}
              onClick={() => setCurrentPage(item.key)}
              style={{
                padding: "12px 20px",
                cursor: "pointer",
                background:
                  currentPage === item.key ? "#34495e" : "transparent",
                borderLeft:
                  currentPage === item.key
                    ? "3px solid #3498db"
                    : "3px solid transparent",
                transition: "background 0.2s",
              }}
            >
              {item.label}
            </div>
          ))}
        </nav>

        <div style={{ padding: "20px" }}>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              background: "#e74c3c",
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: "#f9fafb" }}>
        <header
          style={{
            height: 60,
            background: "#ffffff",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ fontWeight: 600, color: "#2c3e50" }}>
            {`Welcome${admin?.name ? `, ${admin.name}` : ""}`}
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: "#e74c3c",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </header>

        <main style={{ padding: "20px" }}>{renderPage()}</main>
      </div>
    </div>
  );
};

export default App;
