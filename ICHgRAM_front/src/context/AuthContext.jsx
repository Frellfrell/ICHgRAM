import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);


  