import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import AppTypography from "../ui/AppTypography.jsx";
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
        <AppTypography variant="body1">{label}</AppTypography>
      </Box>
    );
  }

  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        textDecoration: "none",
        color: isActive
          ? theme.palette.primary.main
          : theme.palette.text.primary,
      })}
    >
      {({ isActive }) => (
        <Box
          sx={{
            height: "48px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <AppTypography
            variant="body1"
            sx={{ fontWeight: isActive ? 600 : 400 }}
          >
            {label}
          </AppTypography>
        </Box>
      )}
    </NavLink>
  );
};

export default SidebarItem;
