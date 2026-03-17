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
          <img
            src="/src/assets/phones-mockup.png"
            alt="Phones"
            style={{ width: "100%" }}
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
