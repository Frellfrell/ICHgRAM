import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MainLayout from "../layout/MainLayout";
import PhoneFrame from "../assets/foto/phones-frame.png";
import ScreenShot from "../assets/foto/screenshot1.png";

const NotFound = () => {
  const theme = useTheme();

  const isTablet = useMediaQuery(theme.breakpoints.down("lg")); // Меньше 1200px
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <MainLayout isNotFoundPage={true}>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "center" : "flex-start",
          minHeight: isMobile ? "740px" : "897px",
          pt: { xs: "40px", md: "94px" },
          pl: { xs: "18px", md: "41px" },
        }}
      >
        {/* ЛЕВАЯ ЧАСТЬ: ИЗОБРАЖЕНИЕ */}
        {!isMobile && (
        <Box
          sx={{
            width: isTablet ? "250px" : "301px",
            height: isTablet ? "380px" : "460px",
            position: "relative",
            flexShrink: 0,
            transition: "all 0.3s ease", // Для плавности
          }}
        >
          <Box
            component="img"
            src={ScreenShot}
            sx={{
              width: "66%",
              height: "92%",
              position: "absolute",
              top: "3.5%",
              left: "29.5%",
              zIndex: 1,
              objectFit: "cover"
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
              objectFit: "contain",
            }}
          />
        </Box>

        {/* ПРАВАЯ ЧАСТЬ: ТЕКСТОВЫЙ БЛОК */}
        <Box
          sx={{
            ml: isMobile ? 0 : { md: "40px", lg:"97px" }, // Расстояние между фото и текстом
            mt: isMobile ? "40px" : 0,
            display: "flex",
            textAlign: isMobile ? "center" : "left",
            flexDirection: "column",
            //justifyContent: "center",
            maxWidth: "625px",
            width: "100%",
            //height: "460px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              //width: "625px",
             // height: "57px",
              fontSize: { xs: "24px", sm: "30px", md:"36px" },
              fontWeight: 700,
              lineHeight: "normal",
              color: theme.palette.text.primary,
              mb: "10px",
            }}
          >
            Oops! Page Not Found (404 Error)
          </Typography>

          <Typography
            sx={{
              
              //width: "475px",
              //height: "66px",
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "1.4",
              color: theme.palette.text.secondary,
              whiteSpace: "pre-line", //переносы строк
              mx: isMobile ? "auto" : 0, // Центрируем текст на мобилке
            }}
          >
            We're sorry, but the page you're looking for doesn't seem to exist.
            {"\n"}
            If you typed the URL manually, please double-check the spelling.
            {"\n"}
            If you clicked on a link, it may be outdated or broken.
          </Typography>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default NotFound;
