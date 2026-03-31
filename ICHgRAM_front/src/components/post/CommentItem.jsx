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

  return (
    <Box
      sx={{
        display: "flex",
        gap: "14px",
        mb: "16px",
        alignItems: "flex-start",
      }}
    >
      <AppAvatar src={formatUrl(author.avatar)} size={32} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <AppTypography
          sx={{ fontWeight: 600, fontSize: "14px", lineHeight: "18px" }}
        >
          {author.username}
        </AppTypography>
        <AppTypography sx={{ fontSize: "14px" }}>{comment.text}</AppTypography>
      </Box>
    </Box>
  );
};

export default CommentItem;
