import React, { useState } from "react";
import { Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Для перенаправления
import { registerUser } from "../../api/auth";
import AppInput from "../../components/UI/AppInput";
import AppButton from "../../components/UI/AppButton";
import AppTypography from "../../components/UI/AppTypography";

const Register = () => {
  // Состояния для полей  для бэкенда
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    username: "",
    password: "",
  });

  // Функция для обновления полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Данные для отправки:", formData);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Box
        sx={{
          width: 350,
          border: "1px solid #dbdbdb",
          bgcolor: "white",
          p: "20px 40px",
          textAlign: "center",
        }}
      >
        {/* Логотип */}
        <Box
          component="img"
          src="/src/assets/ICHGRA 5.svg"
          sx={{ width: 175, my: 3 }}
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
          />
          <AppInput
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <AppTypography variant="body2" color="text.secondary" sx={{ my: 2 }}>
            People who use our service may have uploaded your contact
            information to Instagram.{" "}
            <Link href="#" underline="none" sx={{ color: "primary.main" }}>
              Learn More
            </Link>
          </AppTypography>

          <AppTypography variant="body2" color="text.secondary" sx={{ my: 2 }}>
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

          <AppButton type="submit">Sign up</AppButton>
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
  );
};

export default Register;
