import { Box } from "@mui/material";
import SidebarItem from "./SidebarItem";
import { useTheme } from "@mui/material/styles";
import logo from "../../assets/logo/ICHGRA 5.svg";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        width: "245px",
        height: "100vh",
        borderRight: `1px solid ${theme.palette.borders}`,
        paddingTop: "33px",
        paddingLeft: "24px",
        paddingRight: "24px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}
      <Box
        component={NavLink}
        to="/home"
        sx={{
          width: "196px",
          height: "37px",
          mt: "28px",
          ml: "25px",
          display: "block",
          textDecoration: "none",
        }}
      >
        <img
          src={logo}
          alt="ICHGRAM Logo"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>

      {/* Navigation */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <SidebarItem label="Home" to="/" />
        <SidebarItem label="Search" />
        <SidebarItem label="Explore" to="/explore" />
        <SidebarItem label="Message" to="/messages" />
        <SidebarItem label="Notification" />
        <SidebarItem label="Create" />
      </Box>

      {/* Spacer */}
      <Box sx={{ flexGrow: 1 }} />

      {/* Profile */}
      <Box sx={{ marginTop: "47px" }}>
        <SidebarItem label="Profile" to="/profile" />
      </Box>
    </Box>
  );
};

export default Sidebar;
