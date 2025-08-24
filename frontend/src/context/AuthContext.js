import React, { createContext, useState, useEffect } from "react";
import { loginUser, logoutUser } from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = async (credentials) => {
    const res = await loginUser(credentials);
    setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
