import React from "react";
import { Box, Typography } from "@mui/material";
import AppAvatar from "../ui/AppAvatar";


const NotificationList = ({ notifications }) => {
  const BE_URL = "http://localhost:5000";


  const getActionText = (type) => {
    switch (type) {
      case "like": return "liked your photo.";
      case "follow": return "started following .";
      case "comment": return "commented on your photo.";
      default: return "interacted with you.";
    }
  };

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




                        
                      </Box>