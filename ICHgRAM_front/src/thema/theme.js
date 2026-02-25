import { createTheme } from "@mui/material/styles";
import { palette } from "./palette";

export const theme = createTheme({
  palette,

  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "Roboto, sans-serif",

    h6: {
      fontWeight: 700,
      fontSize: "16px",
      lineHeight: "20px",
    },

    body1: {
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "18px",
    },

    body2: {
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
    },

    message: {
      fontFamily: "Inter, sans-serif",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "15.5px",
    },

    button: {
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "18px",
      textTransform: "none",
    },
  },
});
