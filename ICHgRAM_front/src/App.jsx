import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme/theme.js";
import { useState, useEffect } from "react";

// Импорт страниц
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import NotFound from "./pages/NotFound.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import Home from "./pages/home/Home.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import Explore from "./pages/explore/Explore.jsx";
import Profile from "./pages/profile/Profile.jsx";
import EditProfile from "./pages/profile/EditProfile.jsx";

import "./App.css";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = () => {
      setIsAuth(!!localStorage.getItem("token"));
    };
    // Проверяем токен при каждом рендере App
    checkToken();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Публичные роуты (Auth) */}
          <Route
            path="/login"
            element={
              !isAuth ? (
                <AuthLayout isLogin={true} isReset={false}>
                  <Login />
                </AuthLayout>
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
          <Route
            path="/register"
            element={
              !isAuth ? (
                <AuthLayout isLogin={false} isReset={false}>
                  <Register />
                </AuthLayout>
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />

          <Route
            path="/reset-password"
            element={
              <AuthLayout isReset={true}>
                <ResetPassword />
              </AuthLayout>
            }
          />
          {/* Главная страница (Лента) */}
          <Route
            path="/home"
            element={
              isAuth ? (
                <MainLayout>
                  <Home />
                </MainLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Редирект с главной */}
          <Route
            path="/"
            element={<Navigate to={isAuth ? "/home" : "/login"} replace />}
          />

          <Route path="/explore" element={<Explore />} />

          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:userId" element={<Profile />} />

          {/* Страница 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;
