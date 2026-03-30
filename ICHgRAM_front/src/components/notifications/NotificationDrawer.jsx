import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NotificationList from "./NotificationList.jsx";

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
          <Typography variant="h6"sx={{ fontWeight: 700, fontSize: "24px" }}>
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
          <NotificationList notifications={notifications} />
                <AppAvatar
                  src={
                    note.fromUser.avatar?.startsWith("data")
                      ? note.fromUser.avatar
                      : `${BE_URL}${note.fromUser.avatar}`
                  }
                />

                {/*<Box
                component="img"
                src={item.avatar}
                alt={item.username}
                sx={{ width: 40, height: 40, borderRadius: "50%" }}
              />}*/}

                <Typography sx={{ fontSize: "14px" }}>
                  <b>{note.fromUser.username}</b>{" "}
                  {note.type === "like"
                    ? "liked your post"
                    : "started following you"}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};
