import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme/theme.js";
import { useContext } from "react";

// Импорт страниц
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import NotFound from "./pages/NotFound.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import { AuthProvider } from "./context/AuthProvider";
import { AuthContext } from "./context/AuthContext";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import Home from "./pages/home/Home.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import Explore from "./pages/explore/Explore.jsx";
import Profile from "./pages/profile/Profile.jsx";
import EditProfile from "./pages/profile/EditProfile.jsx";
//import Messages from "./pages/messages/Messages.jsx";

import "./App.css";

function AppRoutes() {
  const { isAuth, loading } = useContext(AuthContext);

  if (loading) return null; // Или спиннер загрузки

  {
    /* // Защищённый роут (только для авторизованных)
  const ProtectedRoute = ({ children }) => {
    console.log("ProtectedRoute isAuth:", isAuth);
    return isAuth ? children : <Navigate to="/login" replace />;
  };

  // Публичный роут (только для неавторизованных)
  const PublicRoute = ({ children }) => {
    return !isAuth ? children : <Navigate to="/home" replace />;
  };
*/
  }
  return (
    <Routes>
      {/* Редирект с главной */}

      <Route
        path="/"
        element={<Navigate to={isAuth ? "/home" : "/login"} replace />}
      />
      {/* Публичные роуты (Auth) */}
      <Route
        path="/login"
        element={!isAuth ? <Login /> : <Navigate to="/home" replace />}
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
          !isAuth ? (
            <AuthLayout isReset={true}>
              <ResetPassword />
            </AuthLayout>
          ) : (
            <Navigate to="/home" replace />
          )
        }
      />

      {/* Страницы с сайдбаром и футером */}
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
      <Route
        path="/explore"
        element={
          isAuth ? (
            <MainLayout>
              <Explore />
            </MainLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      {/*<Route
            path="/messages"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Messages />
                </MainLayout>
              </ProtectedRoute>
            }
          />*/}
      <Route
        path="/profile/edit"
        element={isAuth ? <EditProfile /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/profile"
        element={isAuth ? <Profile /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/profile/:userId"
        element={isAuth ? <Profile /> : <Navigate to="/login" replace />}
      />
      {/* Страница 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;
