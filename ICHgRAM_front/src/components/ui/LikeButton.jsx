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