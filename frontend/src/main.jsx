import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { Store } from "./store/Store.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import axios from "axios";

// ✅ Configure axios baseURL globally for all API calls
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://shreefurniture-backend-production.up.railway.app';
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.timeout = 30000;

// ✅ Request interceptor - Add auth token automatically
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response interceptor - Handle errors globally
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

console.log('🌐 Frontend API Base URL:', API_BASE_URL);

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
<ErrorBoundary>
<Provider store={Store}>
<AuthProvider>
<CartProvider>
<App />
</CartProvider>
</AuthProvider>
</Provider>
</ErrorBoundary>
</React.StrictMode>
);