import axios from 'axios';

/**
 * Axios instance configured for ProjX API integration.
 * Supports HTTP-only cookies and Bearer token fallback.
 */
export const API_ORIGIN =
  import.meta.env.VITE_API_ORIGIN || 'http://localhost:5000';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || `${API_ORIGIN}/api`,
  timeout: 15000,
  withCredentials: true, // Enables HTTP-only cookies
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor for logging / headers
api.interceptors.request.use(
  (config) => {
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
