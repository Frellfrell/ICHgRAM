import { Box, Typography, Container, Paper, Link } from "@mui/material";
import AppInput from "../components/UI/AppInput";
import AppButton from "../components/UI/AppButton";

const LoginPage = () => {
  return (
    <Box 
      sx={{ 
        bgcolor: "background.default", 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center" 
      }}