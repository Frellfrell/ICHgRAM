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

          <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
            <Box sx={{ flex: 1, height: "1px", bgcolor: "#dbdbdb" }} />
            <Typography sx={{ px: 2, color: "text.secondary", fontSize: 13, fontWeight: 600 }}>
              OR
            </Typography>
            <Box sx={{ flex: 1, height: "1px", bgcolor: "#dbdbdb" }} />
          </Box>

          <Link href="#" underline="none" sx={{ fontSize: 12, color: "#00376b" }}>
            Forgot password?
          </Link>
        </Paper>

        {/* Нижний блок с переходом */}
        <Paper 
          variant="outlined" 
          sx={{ p: 3, textAlign: "center", borderRadius: 1 }}
        >
            <Typography variant="body2">
            Don't have an account?{" "}
            <Link href="/signup" underline="none" sx={{ fontWeight: 600, color: "primary.main" }}>
              Sign up
            </Link>
          </Typography>
          </Paper>