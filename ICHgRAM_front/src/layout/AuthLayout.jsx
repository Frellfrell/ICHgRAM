import { Box } from "@mui/material";
import PhoneFrame from "../assets/foto/phones-frame.png";
import ScreenShot from "../assets/foto/screenshot1.png";

const AuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#fafafa",
      }}
    >
      <Box
        sx={{
          width: "1440px",
          height: "760px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Контейнер 935x733 */}
        <Box
          sx={{
            width: "935px",
            height: "733px",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            position: "relative",
          }}
        >
          {/* Левая колонка: Имиджи телефонов  */}
          <Box
            sx={{
              width: "380.31px",
              height: "581.14px",
              position: "relative",
              top: "53.92px",
              left: "86.34px",
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

          {/* Правая колонка: форма (Login или Register) */}
          {/* ПРАВАЯ ЧАСТЬ: СЮДА ПРИДЕТ ВЕСЬ LOGIN.JSX */}
          <Box
            sx={{
              ml: "32px",
              mt: "65px",
              width: "350px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
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
