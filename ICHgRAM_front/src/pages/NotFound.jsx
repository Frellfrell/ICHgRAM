import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MainLayout from "../layouts/MainLayout";
import PhoneFrame from "../assets/foto/phones-frame.png";
import ScreenShot from "../assets/foto/screenshot1.png";


const NotFound = () => {
  const theme = useTheme();

    return (
        <MainLayout>
            sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          pt: "94px",
          pl: "41px",
        }}
        >
        {/* ЛЕВАЯ ЧАСТЬ: ИЗОБРАЖЕНИЕ */}
        <Box
          sx={{
            width: "301px",
            height: "460px",
            position: "relative",
            flexShrink: 0,
          }}
        >
           <Box
            component="img"
            src={ScreenShot}
            sx={{
              width: "198px",
              height: "426px",
              position: "absolute",
              top: "16px",
              left: "89px",
              zIndex: 1,
            }}
          /> 

