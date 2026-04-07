import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuth(false);
      setLoading(false);
      return;
    }

    axiosInstance
      .get("/api/users/me")
      .then(() => setIsAuth(true))
      .catch(() => {
        localStorage.removeItem("token");
        setIsAuth(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = () => setIsAuth(true);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
