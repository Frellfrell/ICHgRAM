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
        <Box component="main" sx={{ width: "1195px", flexGrow: 1 }}>
          {children}
        </Box>
      </Box>

      {/* Футер */}
      <Box sx={{ height: "158px", width: "1440px", zIndex: 11 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;
