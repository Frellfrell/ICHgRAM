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
        overflow: "hidden",
        width: "100%",
        maxWidth: "1440px",
        mx: "auto",
        //position: "relative",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Box sx={{ width: "245px", flexShrink: 0 }}>
          <Sidebar />
        </Box>

        {/* Правая колонка: Контент  */}
        {/*<Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "1195px", // 1440 - 245
          minHeight: "100vh",
        }}
      >*/}
        {/* Область контента */}
        <Box
          component="main"
          sx={{ width: "1195px", flexGrow: 1, overflowY: "auto" }}
        >
          {children}
        </Box>
      </Box>

      {/* Футер */}
      <Box
        sx={{
          maxWidth: "1440px",
          position: "fixed", // Прибиваем к экрану
          bottom: 0, // В самый низ
          zIndex: 1000,
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;
