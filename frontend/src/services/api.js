import axios from 'axios';

/**
 * Axios instance configured for ProjX API integration.
 * In this frontend foundation phase, this sets the stage for future MERN backend connectivity.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor for token attachment
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('projx_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('[API Request Error]:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for unified response handling and error sanitization
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';
    
    console.warn('[API Response Error]:', errorMsg);
    return Promise.reject({
      message: errorMsg,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

export default api;
