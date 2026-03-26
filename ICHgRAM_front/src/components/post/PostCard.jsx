import React from "react";
import { Box, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AppTypography from "../ui/AppTypography";
import AppAvatar from "../ui/AppAvatar";

const PostCard = ({ post }) => {
  //const BE_URL =
  // import.meta.env.VITE_API_URL?.replace("/api", "") ||
  // "http://localhost:5000";

  // Проверяем, как называется поле автора: post.author или post.user
  // const author = post.author || post.user;

  const BE_URL = "http://localhost:5000";

  const author = post.author || post.user;

  // Формируем полные пути
  const avatarSrc = author?.avatar
    ? `${BE_URL}/${author.avatar}`
    : `${BE_URL}/avatar/default.svg`;
  const postImgSrc = post.image ? `${BE_URL}/${post.image}` : "";

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
      {/* 1. Шапка: AppAvatar и Имя */}
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
        <IconButton sx={{ color: "text.primary", p: 0.5, ml: -0.5 }}>
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton sx={{ color: "text.primary", p: 0.5 }}>
          <ChatBubbleOutlineIcon />
        </IconButton>
      </Box>

      {/* 4. Текст поста */}
      <Box sx={{ mt: 1 }}>
        <AppTypography variant="body2">
          <span style={{ fontWeight: 700, marginRight: "8px" }}>
            {author?.username}
          </span>
          {post.caption}
        </AppTypography>
      </Box>
    </Box>
  );
};
export default PostCard;
