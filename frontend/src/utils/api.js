import axios from 'axios';

// ✅ Get API base URL from environment
const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

console.log('🌐 API Base URL:', API_BASE_URL);

// ✅ Create axios instance with default config
const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Request interceptor - Add auth token automatically
API.interceptors.request.use(
  (config) => {
    // Get token from localStorage (try both user and admin tokens)
    const userToken = localStorage.getItem('token');
    const adminToken = localStorage.getItem('adminToken');
    
    // Use admin token if available, otherwise user token
    const token = adminToken || userToken;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request for debugging
    console.log(`📤 ${config.method.toUpperCase()} ${config.url}`, {
      params: config.params,
      data: config.data
    });
    
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// ✅ Response interceptor - Handle errors globally
API.interceptors.response.use(
  (response) => {
    // Log successful response
    console.log(`✅ ${response.config.method.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      data: response.data
    });
    
    return response;
  },
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Payment failed';

    // Log error response
    console.error(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
      status: error.response?.status,
      message,
      data: error.response?.data
    });
    
    // Handle specific error cases
    if (error.response) {
      const { status, data } = error.response;
      
      // 401 Unauthorized - Token expired or invalid
      if (status === 401) {
        console.log('🔒 Unauthorized - Clearing tokens');
        const currentPath = window.location.pathname + window.location.search;
        
        // Save current path for redirect after login (unless already on login)
        if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
          // Fix: Never save broken address paths - always use /checkout for checkout flow
          let redirectPath = currentPath;
          
          // If on address page or broken checkout path, redirect to /checkout instead
          if (currentPath.includes('/address/') || currentPath.match(/\/address\/\d+\/\d+\/\d+/)) {
            console.warn('⚠️ Blocked redirect to broken address path:', currentPath);
            redirectPath = '/checkout'; // Always use /checkout for payment flow
          }
          
          // Preserve checkout intent
          if (redirectPath.includes('/checkout') || redirectPath === '/checkout') {
            localStorage.setItem('afterLoginRedirect', '/checkout');
            sessionStorage.setItem('paymentMode', 'online'); // Default to online payment
          } else {
            localStorage.setItem('afterLoginRedirect', redirectPath);
          }
          
          // Redirect to login with next parameter (always /checkout for checkout flow)
          const nextPath = redirectPath.includes('/checkout') || redirectPath.includes('/address') 
            ? '/checkout' 
            : redirectPath;
          
          window.location.href = `/login?next=${encodeURIComponent(nextPath)}`;
        }
        
        localStorage.removeItem('token');
        localStorage.removeItem('adminToken');
      }
      
      // 403 Forbidden - Insufficient permissions
      if (status === 403) {
        console.log('⛔ Forbidden - Insufficient permissions');
        alert('You do not have permission to perform this action');
      }
      
      // 404 Not Found
      if (status === 404) {
        console.log('🔍 Not Found:', data.message);
      }
      
      // 500 Internal Server Error
      if (status === 500) {
        console.log('💥 Server Error:', message);
        alert(message);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('📡 No response from server');
      alert(message);
    } else {
      // Something else happened
      console.error('⚠️ Error:', message);
    }
    
    return Promise.reject(new Error(message));
  }
);

// ✅ Helper functions for common operations

/**
 * Get all products with optional filters
 * @param {Object} params - Query parameters (category, search, page, limit, etc.)
 * @returns {Promise} - Axios response
 */
export const getProducts = (params = {}) => {
  return API.get('/api/products', { params });
};

/**
 * Get single product by ID
 * @param {string} id - Product ID
 * @returns {Promise} - Axios response
 */
export const getProduct = (id) => {
  return API.get(`/api/products/${id}`);
};

/**
 * Get all banners
 * @param {Object} params - Query parameters (type, isActive)
 * @returns {Promise} - Axios response
 */
export const getBanners = (params = {}) => {
  return API.get('/api/banners', { params });
};

/**
 * Get all categories
 * @returns {Promise} - Axios response
 */
export const getCategories = () => {
  return API.get('/api/categories');
};

/**
 * User login
 * @param {Object} credentials - { username, password }
 * @returns {Promise} - Axios response
 */
export const login = (credentials) => {
  return API.post('/api/auth/login', credentials);
};

/**
 * Admin login
 * @param {Object} credentials - { email, password }
 * @returns {Promise} - Axios response
 */
export const adminLogin = (credentials) => {
  return API.post('/api/auth/admin/login', credentials);
};

/**
 * User signup
 * @param {Object} userData - User registration data
 * @returns {Promise} - Axios response
 */
export const signup = (userData) => {
  return API.post('/api/auth/signup', userData);
};

/**
 * Get cart items
 * @returns {Promise} - Axios response
 */
export const getCart = () => {
  return API.get('/api/cart');
};

/**
 * Add to cart
 * @param {Object} item - Cart item data
 * @returns {Promise} - Axios response
 */
export const addToCart = (item) => {
  return API.post('/api/cart', item);
};

/**
 * Update cart item
 * @param {string} id - Cart item ID
 * @param {Object} updates - Updated data
 * @returns {Promise} - Axios response
 */
export const updateCartItem = (id, updates) => {
  return API.put(`/api/cart/${id}`, updates);
};

/**
 * Remove from cart
 * @param {string} id - Cart item ID
 * @returns {Promise} - Axios response
 */
export const removeFromCart = (id) => {
  return API.delete(`/api/cart/${id}`);
};

export const submitPublicOrder = (payload) => API.post('/api/order/create', payload);

// Default export
export default API;