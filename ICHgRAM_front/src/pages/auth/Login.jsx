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
      >
      <Container maxWidth="xs">
        
        {/* Верхний блок с формой */}
        <Paper 
          variant="outlined" 
          sx={{ p: 4, mb: 2, textAlign: "center", borderRadius: 1 }}