import React from "react";
import { Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const PostGridItem = ({ post, onClick }) => {
  const BE_URL = import.meta.env.VITE_API_URL || "http:///api";

  return (
    <Box
      onClick={() => onClick(post)}
      sx={{
        position: "relative",
        aspectRatio: "1/1",
        cursor: "pointer",
        "&:hover .overlay": { opacity: 1 },
      }}
    >
      <Box
        component="img"
        src={
          post.image.startsWith("data") ? post.image : `${BE_URL}${post.image}`
        }
        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Overlay при наведении */}
      <Box
        className="overlay"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0,0,0,0.3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: 0,
          transition: "0.3s",
          color: "white",
          gap: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FavoriteIcon />{" "}
          <Typography sx={{ fontWeight: 700 }}>{post.likesCount}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ChatBubbleIcon />{" "}
          <Typography sx={{ fontWeight: 700 }}>
            {post.commentsCount || 0}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PostGridItem;
