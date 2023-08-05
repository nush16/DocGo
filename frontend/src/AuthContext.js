import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || "");
  const [userId, setUserId] = useState(localStorage.getItem('userId') || ""); // Add this

  return (
    <AuthContext.Provider value={{ token, setToken, userId, setUserId }}>  // Add userId and setUserId here
      {children}
    </AuthContext.Provider>
  );
};
