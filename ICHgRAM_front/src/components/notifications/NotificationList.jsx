import React from "react";
import { Box, Typography } from "@mui/material";
import AppAvatar from "../ui/AppAvatar";

const NotificationList = ({ notifications }) => {
  const BE_URL = "http://localhost:5000";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {notifications?.map((note) => (
        <Box
          key={note._id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            height: 60,
            mb: 1,
            borderBottom: "1px solid rgba(219,219,219,1)",
          }}
        >
          <AppAvatar
            src={
              note.sender?.avatar?.startsWith("data")
                ? note.sender.avatar
                : `${BE_URL}${note.sender?.avatar}`
            }
            size={44}
          />

          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: "14px" }}>
              <b>{note.sender?.username}</b>
              {note.type === "like" && " liked your photo."}
              {note.type === "follow" && " started following ."}
              {note.type === "comment" && " commented on your photo."}
            </Typography>
          </Box>

          {note.post && (
            <Box
              component="img"
              src={
                note.post.image?.startsWith("data")
                  ? note.post.image
                  : `${BE_URL}${note.post.image}`
              }
              sx={{
                width: 44,
                height: 44,
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default NotificationList;
