import { Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingTop: "33px",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
