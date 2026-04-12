import { useState } from "react";
import { AuthContext } from "./AuthContext";

const getInitialAuth = () => {
  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  if (token && savedUser) {
    return {
      isAuth: true,
      user: JSON.parse(savedUser),
    };
  }
  return {
    isAuth: false,
    user: null,
  };
};

const initialData = getInitialAuth();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(initialData.isAuth);
  const [user, setUser] = useState(initialData.user);
  const loading = false;

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuth(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuth(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
