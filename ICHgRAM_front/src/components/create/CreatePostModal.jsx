import React, { useState, useRef } from "react";
import {
  Modal,
  Box,
  Button,
  Divider,
  TextField,
  IconButton,
  Avatar,
  Fade,
  Backdrop,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import AppTypography from "../ui/AppTypography";
import axiosInstance from "../../api/axiosInstance";

const CreatePostModal = ({ open, onClose, user, onPostCreated }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleShare = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("caption", caption);

      const response = await axiosInstance.post("/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (onPostCreated) onPostCreated(response.data);
      handleClose();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setPreview(null);
    setCaption("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          timeout: 500,
        },
      }}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Fade in={open}>
        <Box
          sx={{
            width: "913px",
            height: "564px",
            bgcolor: "#FFFFFF",
            borderRadius: "12px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            outline: "none",
            boxShadow: "0 12px 42px rgba(0,0,0,0.2)",
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              height: "43px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              borderBottom: "1px solid #DBDBDB",
            }}
          >
            <Box sx={{ width: 40 }} />
            <AppTypography sx={{ fontWeight: 600, fontSize: "16px" }}>
              Create new post
            </AppTypography>
            <Button
              onClick={handleShare}
              disabled={!file || loading}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                color: "primary.main",
                fontSize: "14px",
                "&:hover": { bgcolor: "transparent", color: "#00376b" },
                "&.Mui-disabled": { color: "#B2E0FF" },
              }}
            >
              Share
            </Button>
          </Box>

          {/* MAIN CONTENT */}
          <Box sx={{ display: "flex", flex: 1 }}>
            {/* LEFT */}
            <Box
              onClick={() => !preview && fileInputRef.current.click()}
              sx={{
                width: "573px",
                height: "521px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#FAFAFA",
                cursor: preview ? "default" : "pointer",
                borderRight: "1px solid #DBDBDB",
                transition: "background 0.2s",
                "&:hover": { bgcolor: preview ? "#FAFAFA" : "#F5F5F5" },
              }}
            >
              <input
                type="file"
                hidden
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
              />

              {preview ? (
                <Box
                  component="img"
                  src={preview}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <>
                  <AddPhotoAlternateIcon
                    sx={{ fontSize: 96, color: "#262626", mb: 2 }}
                  />
                  <AppTypography sx={{ fontSize: "20px", fontWeight: 300 }}>
                    Add photo
                  </AppTypography>
                </>
              )}
            </Box>

            {/* RIGHT: CAPTION & SETTINGS */}
            <Box
              sx={{
                width: "339px",
                display: "flex",
                flexDirection: "column",
                borderLeft: "1px solid #DBDBDB",
              }}
            >
              {/* TOP BLOCK */}
              <Box
                sx={{
                  p: "16px",
                  height: "323px",
                  display: "flex",
                  flexDirection: "column",
                  borderBottom: "1px solid #DBDBDB",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 2,
                  }}
                >
                  <Avatar src={user?.avatar} sx={{ width: 28, height: 28 }} />
                  <AppTypography sx={{ fontWeight: 600, fontSize: "14px" }}>
                    {user?.username}
                  </AppTypography>
                </Box>

                <TextField
                  multiline
                  rows={8}
                  fullWidth
                  placeholder="Write a caption..."
                  variant="standard"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value.slice(0, 2200))}
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: "16px",
                      lineHeight: "24px",
                    },
                  }}
                />

                <Box
                  sx={{
                    mt: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <IconButton size="small">
                    <EmojiEmotionsOutlinedIcon sx={{ color: "#8E8E8E" }} />
                  </IconButton>
                  <AppTypography sx={{ color: "#C7C7C7", fontSize: "12px" }}>
                    {caption.length.toLocaleString()}/2,200
                  </AppTypography>
                </Box>
              </Box>

              <Divider />

              {/* BOTTOM BLOCK (Settings) */}
              <Box
                sx={{
                  flex: 1,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <AppTypography
                  sx={{ color: "#8E8E8E", fontSize: "14px", cursor: "pointer" }}
                >
                  Add location
                </AppTypography>
                <Divider />
                <AppTypography
                  sx={{ color: "#8E8E8E", fontSize: "14px", cursor: "pointer" }}
                >
                  Accessibility
                </AppTypography>
                <Divider />
                <AppTypography
                  sx={{ color: "#8E8E8E", fontSize: "14px", cursor: "pointer" }}
                >
                  Advanced settings
                </AppTypography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreatePostModal;
