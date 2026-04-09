import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import axiosInstance from "../api/axiosInstance.js";
import { NotificationDrawer } from "../components/notifications/NotificationDrawer.jsx";
import { SearchDrawer } from "../components/search/SearchDrawer.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostModal from "../components/ui/PostModal.jsx";

const MainLayout = ({ children }) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const navigate = useNavigate();

  // Данные для Search и Notifications
  const [searchResults, setSearchResults] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

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
        <Box sx={{ width: "245px", flexShrink: 0, top: 0, height: "100vh" }}>
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
          onUserClick={(userId) => {
            navigate(`/profile/${userId}`);
            setOpenSearch(false);
          }}
        />

        <NotificationDrawer
          open={openNotif}
          onClose={() => setOpenNotif(false)}
          onPostClick={(post) => {
            setSelectedPost(post); // 1. Запоминаем пост для модалки
            setOpenNotif(false); // 2. ЗАКРЫВАЕМ ДРАЙВЕР
          }}
          notifications={notifications}
        />

        {/* Область контента */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            height: "100vh",
          }}
        >
          <Box
            component="main"
            sx={{
              width: "100%",
              maxWidth: "1195px",
              height: "100vh",
              display: "flex",
              pt: "58px",
              px: { xs: "20px", md: "78px" },
              //height: "calc(100vh - 58px)",
              overflowY: "auto",
              flexGrow: 1,
              flexDirection: "column",
            }}
          >
            {children}
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
      </Box>
      {selectedPost && (
        <PostModal
          open={Boolean(selectedPost)}
          onClose={() => setSelectedPost(null)}
          post={selectedPost}
        />
      )}
    </Box>
  );
};

export default MainLayout;
