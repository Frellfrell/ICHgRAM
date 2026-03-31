import React, { useState, useEffect } from "react";
import { IconButton, Box } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AppTypography from "./AppTypography";
import axiosInstance from "../../api/axiosInstance";

const LikeButton = ({ postId, initialLikesCount, showCount = true }) => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialLikesCount || 0);

  useEffect(() => {
    // Проверяем, лайкнул ли текущий юзер этот пост
    const checkStatus = async () => {
      try {
        const res = await axiosInstance.get(`/api/likes/${postId}`);
        setLiked(res.data.liked);
        if (res.data.likesCount !== undefined) setCount(res.data.likesCount);
      } catch (err) {
        console.error("Ошибка загрузки статуса лайка", err);
      }
    };
    if (postId) checkStatus();
  }, [postId]);

  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      const res = await axiosInstance.post(`/api/likes/${postId}`);
      setLiked(res.data.liked);
      setCount(res.data.likesCount);
    } catch (err) {
      console.error("Ошибка лайка", err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <IconButton
        onClick={handleLike}
        sx={{ p: 0, color: liked ? "#ed4956" : "inherit" }}
      >
        {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>

      {showCount && (
        <AppTypography sx={{ fontWeight: 700, fontSize: "14px", mt: 1 }}>
          {count} likes
        </AppTypography>
      )}
    </Box>
  );
};
