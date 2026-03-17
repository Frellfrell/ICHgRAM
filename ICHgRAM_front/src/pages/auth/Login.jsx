import { useState } from "react";
import { Box, Link } from "@mui/material";
import AppInput from "../components/ui/AppInput.jsx";
import AppButton from "../components/ui/AppButton.jsx";
import AppTypography from "../../components/ui/AppTypography.jsx";
import DividerLine from "../../components/ui/DividerLine.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Логика отправки на бэкенд для получения JWT
    console.log("Login attempt", { email, password });
  };

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Основной блок формы */}
      <Box
        sx={{
          width: 350,
          border: "1px solid #dbdbdb",
          bgcolor: "white",
          p: "40px 20px",
          textAlign: "center",
        }}
      >
        <Box
          component="img"
          src="/assets/logo/ICHGRA 5.svg"
          sx={{
            width: 190,
            height: 106,
            mt: "30px",
            mb: "24px",
            objectFit: "contain",
          }}
        />

        <form onSubmit={handleLogin}>
          <AppInput
            placeholder="Username, or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <AppInput
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <AppButton type="submit" sx={{ mt: 1 }}>
            Log in
          </AppButton>
        </form>

        <DividerLine />

        <Link
          href="/reset-password"
          underline="none"
          sx={{ fontSize: 12, color: "#00376b" }}
        >
          Forgot password?
        </Link>
      </Box>

      {/* Нижний блок с переходом на регистрацию*/}
      <Box
        sx={{
          width: 350,
          border: "1px solid #dbdbdb",
          bgcolor: "white",
          py: 2,
          textAlign: "center",
          mt: "10px",
        }}
      >
        <AppTypography variant="body2">
          Don't have an account?{" "}
          <Link
            href="/register"
            underline="none"
            sx={{ fontWeight: 600, color: "primary.main" }}
          >
            Sign up
          </Link>
        </AppTypography>
      </Box>
    </Box>
  );
};

export default Login;
