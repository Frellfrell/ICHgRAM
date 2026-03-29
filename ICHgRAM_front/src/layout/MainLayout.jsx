import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import axios from "axios";
import { NotificationDrawer } from "./NotificationDrawer";
import { SearchDrawer } from "./SearchDrawer";

const MainLayout = ({ children }) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        overflow: "hidden",
        width: "100%",
        maxWidth: "1440px",
        mx: "auto",
        position: "relative",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Box sx={{ width: "245px", flexShrink: 0, position: "sticky", top: 0 }}>
          <Sidebar />
        </Box>

        {/* Правая колонка: Контент  */}
        {/*<Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "1195px", // 1440 - 245
          minHeight: "100vh",
        }}
      >*/}
        {/* Область контента */}
        <Box
          component="main"
          sx={{ width: "1195px", flexGrow: 1, pt: "58px", px: "78px" }}
        >
          {children}
        </Box>
      </Box>

      {/* Футер */}
      <Box
        sx={{
          maxWidth: "1440px",
          width: "100%",
          bottom: 0, // В самый низ
          mt: "auto", // Отодвигаем футер вниз, если контента мало
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;
