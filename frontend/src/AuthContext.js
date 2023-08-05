import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || "");
  const [userId, setUserId] = useState(localStorage.getItem('userId') || ""); 
  const [isAdmin, setisAdmin] = useState(localStorage.getItem('isAdministrator') || ""); 

  return (
    <AuthContext.Provider value={{ token, setToken, userId, setUserId, isAdmin, setisAdmin }}>  // Add userId and setUserId here
      {children}
    </AuthContext.Provider>
  );
};
