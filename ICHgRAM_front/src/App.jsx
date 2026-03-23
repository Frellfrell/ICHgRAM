import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme/theme.js";

// Импорт страниц
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
//import NotFound from "./pages/NotFound.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import Home from "./pages/home/Home.jsx";
import MainLayout from "./layout/MainLayout.jsx";

import "./App.css";

function App() {
  // Проверка наличия токена для  аутентификации
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Публичные роуты (Auth) */}
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <AuthLayout>
                  <Login />
                </AuthLayout>
              ) : (
                <Navigate to="/home" />
              )
            }
          />
          <Route
            path="/register"
            element={
              !isAuthenticated ? (
                <AuthLayout>
                  <Register />
                </AuthLayout>
              ) : (
                <Navigate to="/home" />
              )
            }
          />

          <Route path="/" element={<Navigate to="/login" />} />

          <Route
            path="/reset-password"
            element={
              <AuthLayout isReset={true}>
                <ResetPassword />
              </AuthLayout>
            }
          />
          {/* Приватные роуты (Контент) */}
          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <MainLayout>
                  <Home />
                </MainLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Редирект с главной */}
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
          />

          {/* Страница 404 */}
          {/*  <Route path="*" element={<NotFound />} />*/}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;
