import { Box } from "@mui/material";

const AuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        width: "1440px",
        height: "900px",
        mx: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
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
          position: "relative",
          gap: "31px",
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
            src="/src/assets/phones-frame.png"
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
            src="/src/assets/screenshot1.png"
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
        <Box
          sx={{
            width: "350px",
            position: "relative",
            top: "12px",
            left: "117px", // Gap 31px + отступ
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
