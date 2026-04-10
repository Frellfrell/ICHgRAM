import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NotificationList from "./NotificationList.jsx";

export const NotificationDrawer = ({
  open,
  onClose,
  notifications,
  onPostClick,
  onUserClick,
}) => {
  if (!open) return null;

  return (
    <>
      <Box
        onClick={onClose}
        sx={{
          position: "fixed",
          top: 0,
          left: "245px",
          width: "100vw",
          height: "calc(100vh - 158px)",
          backgroundColor: "rgba(0,0,0,0.65)",
          zIndex: 1499,
        }}
      />

      {/* Drawer */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: "245px", // справа от Sidebar
          width: "397px",
          height: "calc(100vh - 158px)",
          backgroundColor: "#fff",
          borderTopRightRadius: "16px",
          borderBottomRightRadius: "16px",
          padding: 2,
          zIndex: 1500,
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
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "24px" }}>
            Notification
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* SUBHEADER: Слово "New" */}
        {notifications.length > 0 && (
          <Typography sx={{ fontWeight: 700, fontSize: "16px", mb: 2, mt: 4 }}>
            New
          </Typography>
        )}

        {/* LIST: Сам список уведомлений */}
        {notifications.length > 0 ? (
          <NotificationList
            notifications={notifications}
            onPostClick={onPostClick}
            onUserClick={onUserClick}
          />
        ) : (
          <Typography sx={{ color: "gray", textAlign: "center", mt: 10 }}>
            No new notifications
          </Typography>
        )}
      </Box>
    </>
  );
};
