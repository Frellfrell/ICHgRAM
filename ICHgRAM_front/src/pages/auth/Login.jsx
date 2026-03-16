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
          >
          <Typography 
            variant="h4" 
            sx={{ fontFamily: "cursive", mb: 4, fontWeight: "bold" }}
          >
            ICHGRAM
          </Typography>

          <form>
            <AppInput placeholder="Username, or email" />
            <AppInput placeholder="Password" type="password" />
            
            <AppButton type="submit">Log in</AppButton>
          </form>