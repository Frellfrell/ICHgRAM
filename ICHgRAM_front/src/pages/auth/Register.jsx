import { useState } from "react";
import { Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Для перенаправления
import { registerUser } from "../../api/authApi.js";
import AppInput from "../../components/ui/AppInput.jsx";
import AppButton from "../../components/ui/AppButton.jsx";
import AppTypography from "../../components/ui/AppTypography.jsx";
import LOGO5 from "../../assets/logo/ICHGRA 5.svg";
import AuthLayout from "../../layout/AuthLayout.jsx";

const Register = () => {
  //   для бэкенда
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState(null); // Для хранения ошибок бэкенда
  const [loading, setLoading] = useState(false); // Для блокировки кнопки при запросе

  // Функция для обновления полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Останавливаем перезагрузку страницы
    setLoading(true);
    setError(null);

    try {
      const data = await registerUser(formData);
      console.log("Успешная регистрация:", data);

      // Если регистрация прошла успешно, отправляем на логин
      navigate("/login");
    } catch (err) {
      // ловим  ошибку "Username taken"
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout isLogin={false} isReset={false}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Box
          sx={{
            width: 350,
            border: "1px solid #dbdbdb",
            bgcolor: "white",
            p: "20px 40px",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          {/* Логотип */}
          <Box
            component="img"
            src={LOGO5}
            sx={{
              width: 190,
              my: 3,
              mt: "19px",

              objectFit: "contain",
            }}
          />

          <AppTypography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Sign up to see photos and videos from your friends.
          </AppTypography>

          <form onSubmit={handleSubmit}>
            <AppInput
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <AppInput
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            <AppInput
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              error={!!error} // Если error не null, поле станет красным
              helperText={error} // Текст ошибки из бэкенда
            />
            <AppInput
              name="password"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />

            <AppTypography
              variant="body2"
              color="text.secondary"
              sx={{ my: 2 }}
            >
              People who use our service may have uploaded your contact
              information to Instagram.{" "}
              <Link href="#" underline="none" sx={{ color: "primary.main" }}>
                Learn More
              </Link>
            </AppTypography>

            <AppTypography
              variant="body2"
              color="text.secondary"
              sx={{ my: 2 }}
            >
              By signing up, you agree to our{" "}
              <Link href="#" underline="none" sx={{ color: "primary.main" }}>
                Terms
              </Link>
              ,
              <Link href="#" underline="none" sx={{ color: "primary.main" }}>
                Private Policy
              </Link>{" "}
              and{" "}
              <Link href="#" underline="none" sx={{ color: "primary.main" }}>
                Cookies Policy
              </Link>
              .
            </AppTypography>

            <AppButton type="submit" disabled={loading}>
              {loading ? "Signing up..." : "Sign up"}
            </AppButton>
          </form>
        </Box>

        {/* Блок перехода */}
        <Box
          sx={{
            width: 350,
            border: "1px solid #dbdbdb",
            bgcolor: "white",
            py: 2,
            textAlign: "center",
          }}
        >
          <AppTypography variant="body1">
            Have an account?{" "}
            <Link
              href="/login"
              sx={{
                fontWeight: 600,
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              Log in
            </Link>
          </AppTypography>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Register;
