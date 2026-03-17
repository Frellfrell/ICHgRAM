import React, { useState } from "react";
import { Box, Link } from "@mui/material";
import AppInput from "../../components/UI/AppInput";
import AppButton from "../../components/UI/AppButton";
import AppTypography from "../../components/UI/AppTypography";


const Register = () => {
  // Состояния для полей  для бэкенда
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    username: '',
    password: ''
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Box sx={{ 
        width: 350, 
        border: '1px solid #dbdbdb', 
        bgcolor: 'white', 
        p: '20px 40px', 
        textAlign: 'center' 
      }}>
        {/* Логотип */}
        <Box 
          component="img" 
          src="/src/assets/ICHGRA 5.svg" 
          sx={{ width: 175, my: 3 }} 
        />

        <AppTypography variant="h6" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
          Sign up to see photos and videos from your friends.
        </AppTypography>

        <form>
          <AppInput placeholder="Email" />
          <AppInput placeholder="Full Name" />
          <AppInput placeholder="Username" />
          <AppInput placeholder="Password" type="password" />
          
          <AppTypography variant="body2" color="text.secondary" sx={{ my: 2 }}>
            By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
          </AppTypography>

          <AppButton type="submit">
            Sign up
          </AppButton>
        </form>
      </Box>