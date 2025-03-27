import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Set up axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to inject token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const authService = {
  // Google OAuth
  async googleAuth(credential) {
    try {
      const response = await api.post('/auth/google', { token: credential });
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } catch (error) {
      this.handleError(error);
    }
  },

  // Email/password login
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } catch (error) {
      this.handleError(error);
    }
  },

  // Email/password registration
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } catch (error) {
      this.handleError(error);
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data.user;
    } catch (error) {
      this.handleError(error);
    }
  },

  // Logout (client-side only)
  logout() {
    localStorage.removeItem('token');
  },

  // Password reset request
  async requestPasswordReset(email) {
    try {
      await api.post('/auth/forgot-password', { email });
      return true;
    } catch (error) {
      this.handleError(error);
    }
  },

  // Reset password with token
  async resetPassword(token, newPassword) {
    try {
      await api.post('/auth/reset-password', { token, newPassword });
      return true;
    } catch (error) {
      this.handleError(error);
    }
  },

  // Error handling
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || 'Authentication failed';
      throw new Error(message);
    } else if (error.request) {
      // Request was made but no response
      throw new Error('Network error. Please try again.');
    } else {
      // Other errors
      throw new Error('An unexpected error occurred');
    }
  }
};

export default authService;