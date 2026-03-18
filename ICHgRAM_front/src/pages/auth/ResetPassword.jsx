import { Box, Link } from "@mui/material";
import AppInput from "../../components/ui/AppInput.jsx";
import AppButton from "../../components/ui/AppButton.jsx";
import AppTypography from "../../components/ui/AppTypography.jsx";
import DividerLine from "../../components/ui/DividerLine.jsx";

const ResetPassword = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Box
        sx={{
          width: "390px",
          minHeight: "537px",
          border: "1px solid #dbdbdb",
          bgcolor: "white",
          pt: "24px",
          textAlign: "center",
        }}
      >
        {/* Иконка замка  */}
        <Box
          component="img"
          src="/src/assets/icons/Img - Trouble logging in_.svg"
          sx={{
            width: "96px",
            height: "96px",
            border: "2px solid black",
            borderRadius: "50%",
            mx: "auto",
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></Box>

        <AppTypography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Trouble logging in?
        </AppTypography>

        <Box sx={{ px: "40px", mb: 2 }}>
          <AppTypography variant="body2" color="text.secondary">
            Enter your email, phone, or username and we'll send you a link to
            get back into your account.
          </AppTypography>
        </Box>

        <Box sx={{ px: "40px" }}>
          <AppInput placeholder="Email, Phone, or Username" />
          <AppButton sx={{ mt: 1 }}>Send login link</AppButton>
        </Box>

        <DividerLine />

        <Link href="/register" underline="none">
          <AppTypography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
            Create new account
          </AppTypography>
        </Link>

        {/* Футер формы */}
        <Box
          sx={{
            bgcolor: "#fafafa",
            borderTop: "1px solid #dbdbdb",
            py: "12px",
            mt: 2,
          }}
        >
          <Link href="/login" underline="none">
            <AppTypography variant="body2" sx={{ fontWeight: 600 }}>
              Back to login
            </AppTypography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
