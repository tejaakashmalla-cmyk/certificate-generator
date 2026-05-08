/**
 * Auth Context
 * Provides authentication state and actions throughout the app
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

// BACKEND API URL
const API_URL = "http://localhost:5000";

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check if token exists and validate it
  useEffect(() => {
    const token = localStorage.getItem('admin_token');

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios
        .get(`${API_URL}/api/auth/me`)
        .then((res) => setAdmin(res.data.admin))
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // LOGIN
  const login = async (email, password) => {
    const res = await axios.post(
      `${API_URL}/api/auth/login`,
      { email, password }
    );

    const { token, admin } = res.data;

    localStorage.setItem('admin_token', token);

    axios.defaults.headers.common['Authorization'] =
      `Bearer ${token}`;

    setAdmin(admin);

    return admin;
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem('admin_token');

    delete axios.defaults.headers.common['Authorization'];

    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return ctx;
};