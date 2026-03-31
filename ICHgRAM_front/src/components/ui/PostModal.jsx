import React, { useState, useEffect } from "react";
import { Modal, Box, IconButton, Divider, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AppTypography from "../ui/AppTypography";
import axiosInstance from "../../api/axiosInstance";


const PostModal = ({ open, post, onClose }) => {
const theme = useTheme();

const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const BE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (post) {
      setLikesCount(post.likesCount || 0);
      // Если нужно проверить состояние лайка конкретно для юзера:
      const checkLike = async () => {
        try {
          const res = await axiosInstance.get(`/api/likes/${post._id}`);
          setIsLiked(res.data.liked);
        } catch (e) { console.error(e); }
      };
      checkLike();
    }
  }, [post]);

  if (!post) return null;

  const author = post.author || {};

  const formatUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("data:") || url.startsWith("http")) return url;
    return `${BE_URL.replace(/\/$/, "")}${url.startsWith("/") ? url : "/" + url}`;
  };

  return (
    <Modal open={open} onClose={onClose} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box sx={{
        display: "flex",
        width: "90%",
        maxWidth: "900px",
        minHeight: "600px",
        height: "80vh",
        bgcolor: "background.paper",
        outline: "none",
        borderRadius: "4px",
        overflow: "hidden"
      }}>
        {/* ЛЕВАЯ ЧАСТЬ: ИЗОБРАЖЕНИЕ */}
        <Box sx={{ flex: 1.5, bgcolor: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={formatUrl(post.image)} alt="post" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </Box>

        {/* ПРАВАЯ ЧАСТЬ: КОНТЕНТ */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar src={formatUrl(author.avatar)} sx={{ width: 32, height: 32 }} />
      </Box>