import { Box, Link } from "@mui/material";
import AppInput from "../../components/ui/AppInput.jsx";
import AppButton from "../../components/ui/AppButton.jsx";
import AppTypography from "../../components/ui/AppTypography.jsx";
import DividerLine from "../../components/ui/DividerLine.jsx";

const ResetPassword = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>

      <Box sx={{ 
        width: 350, 
        border: '1px solid #dbdbdb', 
        bgcolor: 'white', 
        pt: '24px',
        textAlign: 'center' 
      }}>
        {/* Иконка замка  */}
        <Box 
        component="img"
            src="/src/assets/icons/Img - Trouble logging in_.svg"
            sx={{ 
          width: '96px', height: '96px', 
          border: '2px solid black', borderRadius: '50%', 
          mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' 
        }}>
           
        </Box> 

        <AppTypography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Trouble logging in?
        </AppTypography> 
