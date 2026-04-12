import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    setIsAuth(!!token);
    setLoading(false);
  }, []);

  const login = () => setIsAuth(true);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
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
