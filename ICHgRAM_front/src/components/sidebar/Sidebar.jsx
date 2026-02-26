import { Box } from "@mui/material";
import SidebarItem from "./SidebarItem";
import { useTheme } from "@mui/material/styles"

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
        sx={{
          width: "196px",
          height: "37px",
          marginBottom: "5px",
        }}
      >
        LOGO
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

   