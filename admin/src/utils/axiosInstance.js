import axios from "axios";
import API_BASE_URL from "../config/api";

// Create Axios instance
const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Request Interceptor → Attach Admin Token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken"); // token saved on admin login
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor → Handle 401 or expired token
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Token expired or unauthorized");

      // Clear invalid token
      localStorage.removeItem("adminToken");

      // Redirect to login page
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;
