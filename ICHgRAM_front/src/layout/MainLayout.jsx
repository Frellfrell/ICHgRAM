import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/navbar/Sidebar";
import Footer from "../components/footer/Footer";

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      {/* Контент справа */}
      <Box
        component="main"
        flexGrow={1}
        p={{ xs: 2, md: 3 }}
        minHeight="100vh"
        display="flex"
        flexDirection="column"
      >
        {/* Основной контент страницы */}
        <Box flexGrow={1}>{children}</Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;
