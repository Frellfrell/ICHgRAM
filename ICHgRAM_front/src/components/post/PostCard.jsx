import React from "react";
import { Box, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AppTypography from "../ui/AppTypography";
import AppAvatar from "../ui/AppAvatar";
import AppButton from "../ui/AppButton";

const PostCard = ({ post }) => {
  const BE_URL =
    import.meta.env.VITE_APP_URL?.replace("/api", "") ||
    "http://localhost:5000";

  // Проверяем, как называется поле автора: post.author или post.user
  const author = post.author || post.user;

  return (
    <Box
      sx={{
        width: "100%",
        mb: 4,
        //mx: "auto",
        borderBottom: "1px solid",
        borderColor: "divider",
        pb: 2,
      }}
    >
      {/* 1. Шапка: AppAvatar и Имя */}
      <Box sx={{ display: "flex", alignItems: "center", py: 1.5, gap: 1.5 }}>
        <AppAvatar
          src={`${BE_URL}${author?.avatar}`}
          alt={author?.username}
          size={32}
        />
        <AppTypography sx={{ fontWeight: 600, fontSize: "14px" }}>
          {author?.username}
        </AppTypography>
      </Box>

      {/* 2. Фото поста */}
      <Box
        component="img"
        src={`${BE_URL}${post.image}`}
        alt="post content"
        sx={{
          width: "100%",
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
