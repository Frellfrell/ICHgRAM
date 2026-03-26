import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AppTypography from "../ui/AppTypography";
import AppAvatar from "../ui/AppAvatar";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Функция  отображения времени
const timeAgo = (date) => {
  if (!date) return "just now";
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 604800;
  if (interval > 1) return Math.floor(interval) + " weeks ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  return Math.floor(seconds / 60) + " minutes ago";
};

const PostCard = ({ post }) => {
  //const BE_URL =
  // import.meta.env.VITE_API_URL?.replace("/api", "") ||
  // "http://localhost:5000";

  // Проверяем, как называется поле автора: post.author или post.user

  const BE_URL = "http://localhost:5000";

  const author = post.author || post.user;
  // Состояние для лайка
  const [isLiked, setIsLiked] = useState(false);

  //если Base64, отдаем как есть, если путь - клеим BE_URL
  const formatUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("data:") || url.startsWith("http")) return url;
    return `${BE_URL}${url.startsWith("/") ? url : "/" + url}`;
  };

  // полные пути
  const avatarSrc = formatUrl(author?.avatar) || `${BE_URL}/avatar/default.svg`;
  const postImgSrc = formatUrl(post.image);

  return (
    <Box
      sx={{
        width: "404px",
        //height: "716.6px",
        //mb: "23px",
        borderBottom: "1px solid",
        borderColor: "divider",
        pb: 2,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* 1. Шапка: AppAvatar, Имя, Время, Follow */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <AppAvatar
          //src={`${BE_URL}${author?.avatar}`}
          src={avatarSrc}
          alt={author?.username}
          size={27}
        />
        <AppTypography sx={{ fontWeight: 600, fontSize: "14px" }}>
          {author?.username}
        </AppTypography>
        <AppTypography sx={{ color: "text.secondary", fontSize: "14px" }}>
          • {timeAgo(post.createdAt)}
        </AppTypography>

        {/* Кнопка Follow (показываем только если не подписан) */}
        {!author?.isFollowed && (
          <AppTypography
            sx={{
              color: "#0095F6",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            follow
          </AppTypography>
        )}
      </Box>

      {/* 2. Фото поста */}
      <Box
        component="img"
        //src={`${BE_URL}${post.image}`}
        src={postImgSrc}
        alt="post content"
        sx={{
          width: "403.8px",
          height: "505.6px",
          borderRadius: "4px",
          display: "block",
          objectFit: "cover",
        }}
      />

      {/* 3. Кнопки действий */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
        <IconButton
          onClick={() => setIsLiked(!isLiked)}
          sx={{ color: "text.primary", p: 0.5, ml: -0.5 }}
        >
          {isLiked ? (
            <FavoriteIcon sx={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <IconButton sx={{ color: "text.primary", p: 0.5 }}>
          <ChatBubbleOutlineIcon />
        </IconButton>
      </Box>

      {/* 4. Текст поста */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <AppTypography sx={{ fontWeight: 700, fontSize: "14px" }}>
          {post.likesCount || 0} likes
        </AppTypography>
        <Box sx={{ mt: 1 }}>
          <AppTypography variant="body2">
            <span style={{ fontWeight: 700, marginRight: "8px" }}>
              {author?.username}
            </span>
            {post.caption}
          </AppTypography>
        </Box>
      </Box>
    </Box>
  );
};

export default PostCard;
