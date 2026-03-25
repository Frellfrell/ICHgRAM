import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";

const MainLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "1440px",
        mx: "auto",
        position: "relative",
      }}
    >
      <Box sx={{ width: "245px", flexShrink: 0 }}>
        <Sidebar />
      </Box>
      {/* Контент справа */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "1195px",
          p: { xs: 2, md: 3 },
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Основной контент страницы */}
        <Box flexGrow={1}>{children}</Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;
