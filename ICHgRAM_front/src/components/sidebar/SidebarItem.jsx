import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import AppTypography from "../UI/AppTypography";
import { useTheme } from "@mui/material/styles";

const SidebarItem = ({ label, to }) => {
  const theme = useTheme();

  if (!to) {
    return (
      <Box
        sx={{
          height: "48px",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
          >
        <AppTypography variant="body1">
          {label}
        </AppTypography>
      </Box>
    );
  }