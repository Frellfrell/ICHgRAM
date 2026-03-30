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
          {/* Корпус телефона */}
          <Box
            component="img"
            src={PhoneFrame}
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              zIndex: 2,
              objectFit: "contain"
            }}
          />
        </Box>

        {/* ПРАВАЯ ЧАСТЬ: ТЕКСТОВЫЙ БЛОК */}
        <Box
          sx={{
            ml: "97px", // Расстояние между фото и текстом
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "460px",
            }}
        >
            <Typography
            variant="h4"
            sx={{
              width: "625px",
              height: "57px",
              fontSize: "36px",
              fontWeight: 700,
              lineHeight: "normal",
              color: theme.palette.text.primary,
            }}
          >Oops! Page Not Found (404 Error)</Typography>

          <Typography
            sx={{
              mt: "10px", // Отступ сверху 
              width: "475px",
              height: "66px",
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "20px",
              color: theme.palette.text.secondary,
              whiteSpace: "pre-line", //переносы строк
            }}
            >We're sorry, but the page you're looking for doesn't seem to exist.{"\n"}
            If you typed the URL manually, please double-check the spelling.{"\n"}
            If you clicked on a link, it may be outdated or broken.
            </Typography>
        </Box>

