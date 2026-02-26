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