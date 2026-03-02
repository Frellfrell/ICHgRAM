import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const NotificationDrawer = ({ open, onClose, notifications }) => {
  if (!open) return null;

  return (
    <>
      <Box
        onClick={onClose}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.65)",
          zIndex: 999,
        }}
      />

      {/* Drawer */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 245, // справа от Sidebar
          width: 397,
          height: 900,
          backgroundColor: "#fff",
          padding: 2,
          zIndex: 1000,
          boxShadow: "2px 0 8px rgba(0,0,0,0.2)",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Notification</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box>
          {notifications?.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                height: 60,
                mb: 1,
                borderBottom: "1px solid rgba(219,219,219,1)",
              }}
            >
              <Box
                component="img"
                src={item.avatar}
                alt={item.username}
                sx={{ width: 40, height: 40, borderRadius: "50%" }}
              />
              <Box>
                <Typography variant="body1">{item.username}</Typography>
                <Typography variant="body2">{item.action}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};
