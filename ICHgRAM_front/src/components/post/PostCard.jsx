import React from "react";
import { Box, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AppTypography from "../ui/AppTypography";
import AppAvatar from "../ui/AppAvatar";
import AppButton from "../ui/AppButton";

const PostCard = ({ post }) => {

    const BE_URL = process.env.VITE_APP_URL || "http://localhost:5000";

