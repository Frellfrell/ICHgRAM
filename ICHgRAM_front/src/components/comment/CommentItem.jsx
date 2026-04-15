import React from "react";
import { Box } from "@mui/material";
import AppAvatar from "../ui/AppAvatar";
import AppTypography from "../ui/AppTypography";
import { formatUrl, timeAgo } from "../ui/helpers";
import { useNavigate } from "react-router-dom";

const CommentItem = ({ comment, onClose }) => {
  const navigate = useNavigate();
  if (!comment) return null;
  const authorCom = comment?.author || {};
  if (!authorCom) return null;

  return (
    <Box
      sx={{
        display: "flex",
        gap: "14px",
        mb: "16px",
        alignItems: "flex-start",
      }}
      onClick={() => {
        onClose?.();
        navigate(`/profile/${authorCom._id}`);
      }}
    >
      <AppAvatar
        src={formatUrl(authorCom.avatar)}
        size={32}
        sx={{ cursor: "pointer" }}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <AppTypography
          sx={{ fontWeight: 600, fontSize: "14px", lineHeight: "18px" }}
        >
          <span style={{ fontWeight: 700, marginRight: "8px" }}>
            {authorCom.username}
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
