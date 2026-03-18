import { Box } from "@mui/material";
import PhoneFrame from "../assets/foto/phones-frame.png";
import ScreenShot from "../assets/foto/screenshot1.png";

const AuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        mx: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        width: "100%",
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
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        {/* Левая колонка: Имиджи телефонов  */}
        <Box
          sx={{
            width: "380.31px",
            height: "581.14px",
            position: "absolute",
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
        <Box
          sx={{
            position: "absolute",
            top: "65px",
            left: "498.65px", //  положение начала формы (86.34 + 380.31 + 32)
            width: "350px",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
