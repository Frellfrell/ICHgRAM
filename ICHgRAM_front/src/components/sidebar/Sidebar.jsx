import { Box } from "@mui/material";

import SidebarItem from "./SidebarItem";
import { useTheme } from "@mui/material/styles";
import logo from "../../assets/logo/ICHGRA 5.svg";
import HomeIcon from "../../assets/icons/Home.svg";
import SearchIcon from "../../assets/icons/Search.svg";
import ExploreIcon from "../../assets/icons/Explore.svg";
import MessageIcon from "../../assets/icons/Message.svg";
import NotificationIcon from "../../assets/icons/Notification.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateIcon from "../../assets/icons/Create.svg";
import ProfileIcon from "../../assets/icons/Profile.svg";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import CreatePostModal from "../create/CreatePostModal.jsx";
import AppAvatar from "../ui/AppAvatar";
import { formatUrl } from "../ui/helpers";

const Sidebar = ({ onSearchClick, onNotifClick, onCreateClick }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const currentUser = user || JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  console.log("ПРОВЕРКА В САЙДБАРЕ:");
  console.log("1. User из контекста:", user);
  console.log(
    "2. User из localStorage:",
    JSON.parse(localStorage.getItem("user")),
  );

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          width: "245px",
          height: "calc(100vh - 158px)",
          paddingTop: "33px",
          paddingLeft: "24px",
          paddingRight: "24px",
          display: "flex",
          flexDirection: "column",
          zIndex: 1600,
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
            pl: "12px",
            mb: "33px",
            justifyContent: "flex-start",
            margin: "0 ",
            display: "flex",
            textDecoration: "none",
          }}
        >
          <img
            src={logo}
            alt="ICHGRAM Logo"
            style={{ width: "97px", height: "100%", objectFit: "contain" }}
          />
        </Box>

        {/* Navigation */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <SidebarItem label="Home" to="/home" icon={HomeIcon} />

          <SidebarItem
            label="Search"
            onClick={onSearchClick}
            icon={SearchIcon}
          />

          <SidebarItem label="Explore" to="/explore" icon={ExploreIcon} />
          <SidebarItem label="Message" to="/messages" icon={MessageIcon} />

          <SidebarItem
            label="Notification"
            onClick={onNotifClick}
            icon={NotificationIcon}
          />

          <SidebarItem
            label="Create"
            onClick={onCreateClick}
            icon={CreateIcon}
          />

          <Box sx={{ marginTop: "47px" }}>
            <SidebarItem
              extraMargin={47}
              label="Profile"
              to="/profile"
              icon={
                currentUser?.avatar && currentUser.avatar.trim() !== "" ? (
                  <AppAvatar
                    src={formatUrl(currentUser.avatar)}
                    size={24}
                    sx={{
                      border:
                        window.location.pathname === "/profile"
                          ? "1.5px solid black"
                          : "none",
                      bgcolor: "#ccc", // Серый фон, пока картинка грузится
                    }}
                  />
                ) : (
                  ProfileIcon
                )
              }
            />

            <SidebarItem
              icon={
                <LogoutIcon
                  sx={{ fontSize: "24px", color: theme.palette.text.secondary }}
                />
              }
              label="Logout"
              onClick={handleLogout}
            />
          </Box>
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />
      </Box>
    </>
  );
};

export default Sidebar;
