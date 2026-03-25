import { Box } from "@mui/material";
import SidebarItem from "./SidebarItem";
import { useTheme } from "@mui/material/styles";
import logo from "../../assets/logo/ICHGRA 5.svg";
import HomeIcon from "../../assets/logo/Home.svg";
import SearchIcon from "../../assets/logo/Search.svg";
import ExploreIcon from "../../assets/logo/Explore.svg";
import MessageIcon from "../../assets/logo/Message.svg";
import NotificationIcon from "../../assets/logo/Notification.svg";
import CreateIcon from "../../assets/logo/Create.svg";
import ProfileIcon from "../../assets/logo/Profile.svg";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        width: "245px",
        height: "calc(100vh - 158px)",
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
          height: "54px",
          mt: "28px",
          textAlign: "left",
          margin: "0 ",
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
        <SidebarItem label="Home" to="/home" icon={HomeIcon} />
        <SidebarItem label="Search" to="/search" icon={SearchIcon} />
        <SidebarItem label="Explore" to="/explore" icon={ExploreIcon} />
        <SidebarItem label="Message" to="/messages" icon={MessageIcon} />
        <SidebarItem
          label="Notification"
          to="/notifications"
          icon={NotificationIcon}
        />
        <SidebarItem label="Create" to="/create" icon={CreateIcon} />
      </Box>

      {/* Spacer */}
      <Box sx={{ flexGrow: 1 }} />

      {/* Profile */}
      <Box sx={{ marginTop: "47px" }}>
        <SidebarItem
          icon={ProfileIcon}
          extraMargin={47}
          label="Profile"
          to="/profile"
        />
      </Box>
    </Box>
  );
};

export default Sidebar;
