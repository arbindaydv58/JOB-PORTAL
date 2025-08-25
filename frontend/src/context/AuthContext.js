import React, { createContext, useState, useEffect } from "react";
import { loginUser, logoutUser } from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user from localStorage on first load
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const res = await loginUser(credentials);

      // assuming your backend sends { user, token }
      const { user: userData, token } = res.data;

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      if (token) localStorage.setItem("token", token);

      return res;
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // let caller handle UI errors
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
      // even if API fails, clear local state
    } finally {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
