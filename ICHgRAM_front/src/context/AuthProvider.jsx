import axiosInstance from "../api/axiosInstance.js";
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";


const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
    setLoading(false);
  }, []);

  const login = () => setIsAuth(true);

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuth(false);
  };