import React from "react";
import ReactDOM from "react-dom/client";
import "../globals.css";
import App from "./App.jsx";
import theme from "./theme/theme.js";
import { ThemeProvider, CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App theme={theme} />
    </ThemeProvider>
  </React.StrictMode>,
);
