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

import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/register"
            element={
              <AuthLayout>
                <Register />
              </AuthLayout>
            }
          />

          <Route path="/" element={<Navigate to="/login" />} />

          <Route
            path="/reset-password"
            element={
              <AuthLayout>
                <ResetPassword />
              </AuthLayout>
            }
          />

          {/* Страница 404 */}
          {/*  <Route path="*" element={<NotFound />} />*/}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;
