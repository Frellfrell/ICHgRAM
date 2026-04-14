import React from "react";
import { Box } from "@mui/material";
import AppAvatar from "../ui/AppAvatar";
import AppTypography from "../ui/AppTypography";
import { formatUrl, timeAgo } from "../ui/helpers";

const CommentItem = ({ comment, handleAvatarClick }) => {
  if (!comment) return null;
  const author = comment.author || {};

  return (
    <Box
      sx={{
        display: "flex",
        gap: "14px",
        mb: "16px",
        alignItems: "flex-start",
      }}
    >
      <AppAvatar
        src={formatUrl(author.avatar)}
        onClick={(e) => {
          e.stopPropagation();
          handleAvatarClick(author._id);
          //onClose?.();
        }}
        size={32}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <AppTypography
          sx={{ fontWeight: 600, fontSize: "14px", lineHeight: "18px" }}
        >
          <span style={{ fontWeight: 700, marginRight: "8px" }}>
            {author.username}
          </span>
          {comment.text}
        </AppTypography>
        <AppTypography sx={{ fontSize: "14px", color: "#8e8e8e", mt: "4px" }}>
          {timeAgo(comment.createdAt)}
        </AppTypography>
      </Box>
    </Box>
  );
};

export default CommentItem;
