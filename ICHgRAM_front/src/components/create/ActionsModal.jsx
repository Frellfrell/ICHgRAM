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
    >
        <Fade in={open}>
        <Box
          sx={{
            width: "400px",
            bgcolor: "#FFFFFF",
            borderRadius: "12px",
            overflow: "hidden",
            outline: "none",
            display: "flex",
            flexDirection: "column",
          }}
        >
            {/* Кнопка Delete (400x48) */}
          <Button
            onClick={onDelete}
            sx={{
              height: "48px",
              color: "#ED4956",
              fontWeight: 700,
              textTransform: "none",
              fontSize: "14px",
              "&:hover": { bgcolor: "rgba(0, 0, 0, 0.05)" },
            }}
          >
            Delete
          </Button>
          <Divider sx={{ borderColor: "rgba(219, 219, 219, 1)" }} />

          {/* Кнопка Edit (400x48) */}
          <Button
            onClick={onEdit}
            sx={{
              height: "48px",
              color: "#262626",
              fontWeight: 400,
              textTransform: "none",
              fontSize: "14px",
              "&:hover": { bgcolor: "rgba(0, 0, 0, 0.05)" },
            }}
          >
            Edit
          </Button>
          <Divider sx={{ borderColor: "rgba(219, 219, 219, 1)" }} />

          {/* Кнопка Go to post */}
          <Button
            onClick={onClose}
            sx={{
              height: "48px",
              color: "#262626",
              textTransform: "none",
              fontSize: "14px",
              "&:hover": { bgcolor: "rgba(0, 0, 0, 0.05)" },
            }}
          >
            Go to post
          </Button>
          <Divider sx={{ borderColor: "rgba(219, 219, 219, 1)" }} />

          {/* Кнопка Copy link */}
          <Button
            onClick={onClose}
            sx={{
              height: "48px",
              color: "#262626",
              textTransform: "none",
              fontSize: "14px",
              "&:hover": { bgcolor: "rgba(0, 0, 0, 0.05)" },
            }}
          >
            Copy link
          </Button>
          <Divider sx={{ borderColor: "rgba(219, 219, 219, 1)" }} />

          
        </Box>



    </Modal>