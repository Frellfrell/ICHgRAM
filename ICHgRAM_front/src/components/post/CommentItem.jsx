import React from "react";
import { Box } from "@mui/material";
import AppAvatar from "../ui/AppAvatar";
import AppTypography from "../ui/AppTypography";


const CommentItem = ({ comment }) => {
  const BE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const author = comment.author || {};

  const formatUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("data:") || url.startsWith("http")) return url;
    return `${BE_URL.replace(/\/$/, "")}${url.startsWith("/") ? url : "/" + url}`;
  };