import React from "react";
import { Box, Typography } from "@mui/material";
import AppAvatar from "../ui/AppAvatar";
import { formatUrl } from "../ui/helpers";
import { useNavigate } from "react-router-dom";

const NotificationList = ({ notifications, onPostClick, onUserClick }) => {
  //const BE_URL = "http://localhost:5000";
  const navigate = useNavigate();

  const handleUserNavigation = (userId) => {
    console.log("Переход на ID пользователя:", userId);

    if (!userId) {
      console.error("Ошибка: ID пользователя отсутствует!");
      return;
    }

    if (onUserClick) onUserClick(); // Закрываем Drawer
    navigate(`/profile/${userId}`); // Переходим в профиль
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {notifications?.map((note) => (
        <Box
          key={note._id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            height: 60,
            mb: 1,
            borderBottom: "1px solid rgba(219,219,219,1)",
          }}
        >
          <Box
            onClick={() => handleUserNavigation(`/profile/${note.sender._id}`)}
            sx={{ cursor: "pointer" }}
          >
            <AppAvatar
              src={note.sender?.avatar ? formatUrl(note.sender?.avatar) : null}
              size={44}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: "14px" }}>
              <b>{note.sender?.username}</b>
              {note.type === "like" && " liked your photo."}
              {note.type === "follow" && " started following ."}
              {note.type === "comment" && " commented on your photo."}
            </Typography>
          </Box>

          {note.post && (
            <Box
              component="img"
              src={formatUrl(note.post?.image)}
              onClick={() => onPostClick && onPostClick(note.post)}
              sx={{
                width: 44,
                height: 44,
                objectFit: "cover",
                borderRadius: "4px",
                cursor: "pointer",
                "&:hover": { opacity: 0.8 },
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default NotificationList;
