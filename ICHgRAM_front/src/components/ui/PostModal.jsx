import React, { useState, useEffect } from "react";
import { Modal, Box, IconButton, Divider, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AppTypography from "../ui/AppTypography";
import axiosInstance from "../../api/axiosInstance";


const PostModal = ({ open, post, onClose }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const BE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  +
  