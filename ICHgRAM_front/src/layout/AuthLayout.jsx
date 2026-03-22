import { Box } from "@mui/material";
import PhoneFrame from "../assets/foto/phones-frame.png";
import ScreenShot from "../assets/foto/screenshot1.png";
import LOGO5 from "../assets/logo/ICHGRA 5.svg";

const AuthLayout = ({ children, isLogin = false, isReset = false }) => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",

        alignItems: "center",
        bgcolor: "white",
        margin: 0,
        padding: 0,
      }}
    >
      {isReset && (
        <Box
          sx={{
            width: "100%",
            //maxWidth: "1440px",
            height: "60px",
            display: "flex",
            //alignItems: "center",
            borderBottom: "1px solid",
            borderColor: "grey.50",
            bgcolor: "white",
            justifyContent: "center",
            //flexShrink: 0,
            // На мобилках отступ  (16px), на компах (44px)
            //px: { xs: "16px", md: "44px" },
            //mx: "auto",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "1440px",
              display: "flex",
              alignItems: "center",
              px: { xs: "16px", md: "44px" },
            }}
          >
            <Box
              sx={{
                width: "97px",
                height: "54px",
                ml: "44px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={LOGO5}
                sx={{ width: "100%", objectFit: "contain" }}
              />
            </Box>
          </Box>
        </Box>
      )}

      <Box
        sx={{
          maxWidth: "1440px",
          width: "100%",
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: { xs: "flex-start", md: "center" }, // На мобилках прижимаем к верху
          pt: { xs: isReset ? "20px" : "10px", md: "0px" },

          position: "relative",
        }}
      >
        {/* Контейнер 935x733 */}
        <Box
          sx={{
            width: "100%",
            //maxWidth: "935px",
            height: "733px",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            px: { xs: "20px", sm: "20px", md: "0px" }, // Боковые отступы на мобилках
          }}
        >
          {/* Левая колонка: Имиджи телефонов  */}
          {isLogin && (
            <Box
              sx={{
                display: { xs: "none", lg: "block" }, // Скрыто на маленьких экранах
                width: "380.31px",
                height: "581.14px",
                position: "relative",
                top: "53.92px",
                // left: "86.34px",
                flexShrink: 0,
              }}
            >
              {/* Корпус телефона */}
              <Box
                component="img"
                src={PhoneFrame}
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  zIndex: 2,
                }}
              />
              {/* Скриншот внутри  */}
              <Box
                component="img"
                src={ScreenShot}
                sx={{
                  width: "250px",
                  height: "538.83px",
                  position: "absolute",
                  top: "21.08px",
                  left: "113.16px",
                  zIndex: 1,
                }}
              />
            </Box>
          )}

          {/* Правая колонка: форма (Login или Register) */}
          {/* ПРАВАЯ ЧАСТЬ: СЮДА ПРИДЕТ ВЕСЬ LOGIN.JSX */}
          <Box
            sx={{
              width: "100%",
              maxWidth: isReset
                ? { xs: "90%", md: "390px" }
                : { xs: "90%", md: "350px" },
              height: isReset ? "auto" : "689px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              marginTop: isReset ? { xs: "20px", md: "12px" } : "12px",
              flexShrink: 0,
              // Если Логин: отступ 12px до основного контейнера + зазор 32px от фото
              // Если НЕ Логин: центрируем форму внутри 935 и ставим mt 81px
              //marginTop: isLogin ? "12px" : "81px",
              marginLeft: isLogin ? { xs: "auto", md: "32px" } : "auto",
              mr: "auto",
              mx: "auto",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
