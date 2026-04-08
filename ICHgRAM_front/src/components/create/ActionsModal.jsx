import React from "react";
import { Modal, Box, Button, Divider, Fade, Backdrop } from "@mui/material";


const ActionsModal = ({ open, onClose, onDelete, onEdit }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(0, 0, 0, 0.65)" },
          timeout: 500,
        },
      }}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    ></Modal>