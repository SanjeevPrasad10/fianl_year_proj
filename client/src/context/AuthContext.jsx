import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('cw_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('cw_token') || null);
  const [loading, setLoading] = useState(true);

  // Sync state to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('cw_token', token);
    } else {
      localStorage.removeItem('cw_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('cw_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cw_user');
    }
  }, [user]);

  // Load user profile on mount if token exists
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await authApi.getMe();
          if (res.data?.success) {
            setUser(res.data.user);
          }
        } catch {
          // If token invalid, logout
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    if (res.data?.success) {
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data;
    }
    throw new Error(res.data?.message || 'Login failed');
  };

  const register = async (name, email, password) => {
    const res = await authApi.register({ name, email, password });
    if (res.data?.success) {
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data;
    }
    throw new Error(res.data?.message || 'Registration failed');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('cw_token');
    localStorage.removeItem('cw_user');
    // Also signal wallet lock or clear session memory
    window.dispatchEvent(new Event('cw_auth_logout'));
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => (prev ? { ...prev, ...updatedFields } : updatedFields));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
