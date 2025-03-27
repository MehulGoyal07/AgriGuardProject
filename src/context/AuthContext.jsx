/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { googleLogout } from '@react-oauth/google';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state from localStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (token) {
          const res = await axios.get('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(res.data.user);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [token]);

  // Google OAuth success handler
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('/api/auth/google', {
        token: credentialResponse.credential
      });
      
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      navigate('/marketplace');
    } catch (err) {
      console.error('Google auth failed:', err);
      logout();
    }
  };

  // Google OAuth failure handler
  const handleGoogleFailure = () => {
    console.log('Google login failed');
  };

  // Logout function
  const logout = () => {
    googleLogout();
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/auth');
  };

  // Protected route access check
  const isAuthenticated = () => {
    return !!token;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        handleGoogleSuccess,
        handleGoogleFailure,
        logout,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};