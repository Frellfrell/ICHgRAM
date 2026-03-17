import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./thema/theme.js";
import "./styles/global.css";

// Импорт страниц
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import NotFound from "./pages/NotFound.jsx";
import AuthLayout from "./components/layout/AuthLayout.jsx";

import "./App.css";

function App() {
  return <></>;
}

export default App;
