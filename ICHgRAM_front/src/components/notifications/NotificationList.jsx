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