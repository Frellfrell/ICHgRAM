import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/navbar/Sidebar";
import Footer from "../components/footer/Footer";

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingTop: "33px",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        {children}
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;
