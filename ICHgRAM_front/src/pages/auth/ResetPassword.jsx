import { Box, Link } from "@mui/material";
import AppInput from "../../components/ui/AppInput.jsx";
import AppButton from "../../components/ui/AppButton.jsx";
import AppTypography from "../../components/ui/AppTypography.jsx";
import DividerLine from "../../components/ui/DividerLine.jsx";
//import AuthLayout from "../../layout/AuthLayout.jsx";
import { resetPassword } from "../../api/authApi.js";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email)
      return setStatus({ type: "error", message: "Email is required" });

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await resetPassword(email);
      setStatus({
        type: "success",
        message: response.message || "Link sent to your email!",
      });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          minHeight: "537px",
          border: "1px solid #dbdbdb",
          bgcolor: "white",
          pt: "24px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          mx: "auto",
        }}
      >
        {/* Иконка замка  */}
        <Box
          component="img"
          src="/src/assets/icons/Img - Trouble logging in_.svg"
          sx={{
            width: "96px",
            height: "auto",
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

        <Box component="form" onSubmit={handleSubmit} sx={{ px: "40px" }}>
          <AppInput
            placeholder="Email or Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {status.message && (
            <AppTypography
              variant="body2"
              sx={{
                color: status.type === "error" ? "error.main" : "success.main",
                mt: 1,
              }}
            >
              {status.message}
            </AppTypography>
          )}

          <AppButton type="submit" disabled={loading} sx={{ mt: 1 }}>
            {loading ? "Sending..." : "Send login link"}
          </AppButton>

          <DividerLine />
        </Box>

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
            mt: "auto",
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
