// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import axios from "axios";

// ✅ Axios base setup - Configure baseURL for all environments
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://shreefurniture-backend-production.up.railway.app';
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.timeout = 30000;

console.log('🌐 Admin API Base URL:', API_BASE_URL);

// ✅ Axios interceptors for admin auth
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminData");
      window.location.href = "/"; // show login state at root
    }
    return Promise.reject(error);
  }
);

// ✅ Disable Chrome’s “breached password” suggestion in dev mode
if (import.meta.env.DEV) {
  document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll("input[type='password']");
    inputs.forEach((input) => {
      input.setAttribute("autocomplete", "new-password");
      input.setAttribute("name", "dev-password");
    });
  });
}

// ✅ Render app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
