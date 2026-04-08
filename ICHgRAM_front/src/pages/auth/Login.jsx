import { useState, useContext } from "react";
import { Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi.js";
import { AuthContext } from "../../context/AuthContext.jsx";

import AppInput from "../../components/ui/AppInput.jsx";
import AppButton from "../../components/ui/AppButton.jsx";
import AppTypography from "../../components/ui/AppTypography.jsx";
import DividerLine from "../../components/ui/DividerLine.jsx";
import LOGO5 from "../../assets/logo/ICHGRA 5.svg";
import AuthLayout from "../../layout/AuthLayout.jsx";

const Login = () => {
  const navigate = useNavigate();

  // Берём login() из контекста
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null); // Убираем ошибку при новом вводе
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const result = await loginUser(formData);

      login(); // Обновляем состояние аутентификации в контексте

      console.log("Вход выполнен успешно:", result);

      // После логина перенаправляем на главную страницу (ленту)
      navigate("/home");
    } catch (err) {
      // Если пароль неверный или пользователя нет
      setError(err.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout isLogin={true} isReset={false}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
        }}
      >
        {/* Основной блок формы */}
        <Box
          sx={{
            width: "100%",
            //maxWidth: { xs: "100%", sm: "none" },
            //width: { xs: "100%", sm: "350px" },
            height: "411.98px",
            border: "1px solid #dbdbdb",
            bgcolor: "white",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "49.5px",
            p: "20px 40px",
            gap: "10px",
            mx: "auto",
          }}
        >
          <Box
            component="img"
            src={LOGO5}
            sx={{
              width: "190px",
              height: "auto",
              mb: "24px",
              objectFit: "contain",
            }}
          />

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",

              gap: "6px", // Расстояние между инпутами
            }}
          >
            <AppInput
              placeholder="Username, or email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <AppInput
              name="password"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!error} // Подсветим поле, если данные неверныe
              required
            />
            {/* Если есть ошибка логина */}
            {error && (
              <AppTypography
                variant="body2"
                sx={{ color: "error.main", my: 1 }}
              >
                {typeof error === "string" ? error : error.message}
              </AppTypography>
            )}

            <AppButton type="submit" disabled={loading} sx={{ mt: 1 }}>
              {loading ? "Logging in..." : "Log in"}
            </AppButton>

            <DividerLine />
          </Box>

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
            width: "100%",
            //maxWidth: { xs: "100%", sm: "390px" },
            height: "63px",
            border: "1px solid #dbdbdb",
            bgcolor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "10px",
            mx: "auto",
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
    </AuthLayout>
  );
};

export default Login;
