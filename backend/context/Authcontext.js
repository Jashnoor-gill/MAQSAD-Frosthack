import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create context
const AuthContext = createContext();

// AuthProvider to wrap the application and provide auth state
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authToken) {
      // Optionally, fetch user data with the token on app load
      axios
        .get('/api/auth/user', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          console.log(err);
          setAuthToken(null);
          localStorage.removeItem('token');
        });
    }
  }, [authToken]);

  // Signup function
  const signup = async (name, email, password) => {
    try {
      const response = await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });
      setAuthToken(response.data.token);
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      setAuthToken(response.data.token);
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  // Logout function
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context in other components
export const useAuth = () => useContext(AuthContext);
