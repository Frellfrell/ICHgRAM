import React from "react";
import { Box, Typography, IconButton, InputBase } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


export const SearchDrawer = ({ open, onClose, results }) => {
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