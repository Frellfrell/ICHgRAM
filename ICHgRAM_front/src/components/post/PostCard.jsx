import React from "react";
import { Box, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AppTypography from "../ui/AppTypography";
import AppAvatar from "../ui/AppAvatar";
import AppButton from "../ui/AppButton";

const PostCard = ({ post }) => {

    const BE_URL = process.env.VITE_APP_URL || "http://localhost:5000";

return (
    <Box 
      sx={{ 
        maxWidth: "470px", 
        mb: 4, 
        mx: "auto", 
        borderBottom: "1px solid", 
        borderColor: "divider", 
        pb: 2 
      }}
    >
      {/* 1. Шапка: AppAvatar и Имя */}
      <Box sx={{ display: "flex", alignItems: "center", py: 1.5, gap: 1.5 }}>
        <AppAvatar 
          src={`${BE_URL}${post.author.avatar}`} 
          alt={post.author.username} 
          size={32} 
        />
        <AppTypography sx={{ fontWeight: 600, fontSize: "14px" }}>
          {post.author.username}
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
          objectFit: "cover"
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