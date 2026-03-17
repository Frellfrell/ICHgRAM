import React from "react";
import ReactDOM from "react-dom/client";
import "./stales/globals.css";
import App from "./App.jsx";
import { theme } from "./theme/theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App theme={theme} />
  </React.StrictMode>,
);
