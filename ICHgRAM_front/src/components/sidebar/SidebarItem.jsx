import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import AppTypography from "../ui/AppTypography.jsx";
import { useTheme } from "@mui/material/styles";

const SidebarItem = ({ icon, label, to, onClick, extraMargin = 0 }) => {
  const theme = useTheme();

  {
    /*if (!to) {
    return (
      <Box
        sx={{
          height: "48px",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          mt: `${extraMargin}px`,
        }}
      >
        <AppTypography variant="body1">{label}</AppTypography>
      </Box>
    );
  }*/
  }

  {
    /*return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        textDecoration: "none",
        color: isActive
          ? theme.palette.text.primary
          : theme.palette.text.secondary,
      })}
    >
      {({ isActive }) => (*/
  }

  const renderContent = (isActive = false) => (
    <Box
      sx={{
        width: "220px",
        height: "48px",
        display: "flex",
        alignItems: "center",
        px: "12px", // left: 12px для иконки
        borderRadius: "8px",
        mt: `${extraMargin}px`,
        "&:hover": { bgcolor: "#f2f2f2" },
      }}
    >
      {/* Иконка 24x24 */}
      <Box
        sx={{
          width: "24px",
          height: "24px",
          display: "flex",
          mr: "12px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {typeof icon === "string" ? (
          <img
            src={icon}
            alt={label}
            style={{ width: "24px", height: "24px" }}
          />
        ) : (
          icon
        )}
      </Box>

      <AppTypography
        variant="body1"
        sx={{
          fontWeight: isActive ? 700 : 400,
          fontSize: "16px",
          width: "159.3px",
          transition: "font-weight 0.2s ease",
          color: isActive
            ? theme.palette.text.primary
            : theme.palette.text.secondary,
        }}
      >
        {label}
      </AppTypography>
    </Box>
  );
  // Если передан onClick (для Search и Notifications)
  if (onClick) {
    return (
      <Box onClick={onClick} sx={{ textDecoration: "none", color: "inherit" }}>
        {renderContent(false)} {/* Кнопка не может быть "активной" через URL */}
      </Box>
    );
  }
  // Если передан путь (для Home, Explore и т.д.)
  return (
    <NavLink to={to} style={{ textDecoration: "none", color: "inherit" }}>
      {({ isActive }) => renderContent(isActive)}
    </NavLink>
  );
};

export default SidebarItem;
