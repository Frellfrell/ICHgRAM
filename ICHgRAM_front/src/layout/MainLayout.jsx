import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import axiosInstance from "../api/axiosInstance.js";
import { NotificationDrawer } from "../components/notifications/NotificationDrawer.jsx";
import { SearchDrawer } from "../components/search/SearchDrawer.jsx";
import { useState, useEffect } from "react";

const MainLayout = ({ children }) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);

  // Данные для Search и Notifications
  const [searchResults, setSearchResults] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Поиск пользователей
  const handleSearchChange = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await axiosInstance.get(`/api/search?query=${query}`);
      setSearchResults(res.data);
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    }
  };
  // Получение уведомлений
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axiosInstance.get(`/api/notifications`);
        setNotifications(res.data);
      } catch (err) {
        console.error("Notifications error:", err);
      }
    };

    // Добавляем условие: запрашиваем только если панель открыта
    if (openNotif === true) {
      fetchNotifications();
    }
  }, [openNotif]);

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
          <Sidebar
            onSearchClick={() => {
              setOpenNotif(false);
              setOpenSearch(!openSearch);
            }}
            onNotifClick={() => {
              setOpenSearch(false);
              setOpenNotif(!openNotif);
            }}
          />
        </Box>

        {/* Выезжающие панели */}
        <SearchDrawer
          open={openSearch}
          onClose={() => setOpenSearch(false)}
          results={searchResults}
          onSearchChange={handleSearchChange}
        />

        <NotificationDrawer
          open={openNotif}
          onClose={() => setOpenNotif(false)}
          notifications={notifications}
        />

        {/* Область контента */}
        <Box
          component="main"
          sx={{
            width: "100%",
            maxWidth: "1195px",
            flexGrow: 1,
            pt: "58px",
            px: { xs: "20px", md: "78px" },
          }}
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
