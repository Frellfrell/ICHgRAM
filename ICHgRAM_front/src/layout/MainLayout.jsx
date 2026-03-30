import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import axios from "axios";
import { NotificationDrawer } from "./NotificationDrawer";
import { SearchDrawer } from "./SearchDrawer";
import { useState } from "react";

const MainLayout = ({ children }) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);

  // Данные для Search и Notifications
  const [searchResults, setSearchResults] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Поиск пользователей
  const handleSearch = async (query) => {
    if (!query) return setSearchResults([]);
    try {
      const token = localStorage.getItem("token"); // если есть авторизация
      const res = await axios.get(
        `http://localhost:5000/api/search?query=${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setSearchResults(res.data);
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    }
  };
  // Получение уведомлений
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
    } catch (err) {
      console.error("Notifications error:", err);
    }
  };

  useEffect(() => {
    if (openNotif) fetchNotifications();
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
              closeAllDrawers();
              setOpenSearch(true);
            }}
            onNotifClick={() => {
              closeAllDrawers();
              setOpenNotifications(true);
            }}
          />
        </Box>

        {/* Выезжающие панели */}
        <SearchDrawer
          open={openSearch}
          onClose={closeAllDrawers}
          results={searchResults}
          setResults={setSearchResults}
        />

        <NotificationDrawer
          open={openNotifications}
          onClose={closeAllDrawers}
          notifications={notifications}
          setNotifications={setNotifications}
        />

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
