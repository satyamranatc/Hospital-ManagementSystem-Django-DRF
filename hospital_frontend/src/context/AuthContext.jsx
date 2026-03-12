import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('careflow_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/', { username, password });
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('careflow_user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.error || 'Login failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('careflow_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
