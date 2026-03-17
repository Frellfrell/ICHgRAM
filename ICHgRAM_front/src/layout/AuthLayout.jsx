import { Box } from "@mui/material";
import PhoneFrame from "../assets/foto/phones-frame.png";
import ScreenShot from "../assets/foto/screenshot1.png";

const AuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        width: "1440px",
        height: "900px",
        mx: "auto",
        display: "flex",
        justifyConte: "flex-start",
        bgcolor: "background.default",
        minwidth: "100%",
        minHeight: "100vh",
      }}
    >
      {/* Контейнер 935x733 */}
      <Box
        sx={{
          width: "935px",
          height: "733px",
          display: "flex",
          flexDirection: "row",
          position: "relative",
          gap: "32px",
          mt: 0,
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
        <Box sx={{ mr: "86px" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
