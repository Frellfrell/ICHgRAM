import React, { useState, useRef, useEffect } from "react";
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
import { formatUrl } from "../ui/helpers";
import { useNavigate } from "react-router-dom";

const CreatePostModal = ({
  open,
  onClose,
  user,
  onPostCreated,
  editPost = null,
  isNested = false,
}) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Если открыли для редактирования — подставляем данные поста
  useEffect(() => {
    console.log("editPost:", editPost);
    console.log("open:", open);
    if (open && editPost) {
      //if (editPost && open) {
      setCaption(editPost.caption || "");
      setPreview(formatUrl(editPost.image));
      setFile(editPost.image);
    }
    {
      /*else {
      setCaption("");
      setPreview(null);
      setFile(null);
    }*/
    }
  }, [editPost, open]);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
        setFile(reader.result); // Base64 для сервера
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleShare = async () => {
    if (!file && !editPost) return;
    setLoading(true);
    try {
      const payload = {
        image: file || editPost?.image, // строка Base64
        caption: caption,
      };

      if (editPost) {
        // РЕДАКТИРОВАНИЕ
        await axiosInstance.put(`/api/posts/${editPost._id}`, payload);
      } else {
        // СОЗДАНИЕ new post
        const res = await axiosInstance.post("/api/posts", payload);
        if (onPostCreated) onPostCreated(res.data); // Передаем созданный пост
      }
      window.dispatchEvent(new Event("postCreated"));
      // headers: { "Content-Type": "application/json" },

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: {
            left: { xs: 0, md: "245px" },
            bottom: "158px",
            // Если isNested true — прозрачно, иначе — темный фон
            backgroundColor: isNested ? "transparent" : "rgba(0, 0, 0, 0.5)",
            zIndex: -1, // Уводим фон под модальное окно
          },
          timeout: 500,
        },
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        left: { xs: "0px", md: "245px" },
        bottom: "158px",
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            width: "913px",
            maxWidth: "913px",
            maxHeight: "90vh",
            height: "auto",
            minHeight: "564px",
            bgcolor: "#FFFFFF",
            borderRadius: "12px",
            overflow: "hidden",
            display: "flex",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
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
            <Button
              onClick={onClose}
              sx={{ color: "#262626", textTransform: "none" }}
            >
              Cancel
            </Button>
            <AppTypography sx={{ fontWeight: 600, fontSize: "16px" }}>
              {editPost ? "Edit info" : "Create new post"}
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
              {editPost ? "Done" : "Share"}
            </Button>
          </Box>

          {/* MAIN CONTENT */}
          <Box
            sx={{
              display: "flex",
              flex: 1,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* LEFT */}
            <Box
              sx={{
                width: { xs: "100%", md: "573px" },
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
              {preview ? (
                <Box
                  component="img"
                  src={preview}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <IconButton onClick={() => fileInputRef.current.click()}>
                  <AddPhotoAlternateIcon
                    sx={{ fontSize: 96, color: "#262626", mb: 2 }}
                  />
                  <AppTypography>Select from computer</AppTypography>
                </IconButton>
              )}
              <input
                type="file"
                hidden
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
              />
            </Box>

            {/* RIGHT: CAPTION & SETTINGS */}
            <Box
              sx={{
                width: { xs: "100%", md: "339px" },
                height: "521px",
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
                  position: "relative",
                }}
              >
                <Box
                  onClick={() => {
                    navigate("/profile");
                    onClose();
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    mb: "16px",
                  }}
                >
                  <Avatar
                    src={user?.avatar ? formatUrl(user.avatar) : ""}
                    sx={{ width: 28, height: 28 }}
                  />
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
                  InputProps={{
                    disableUnderline: true,

                    sx: { fontSize: "16px", p: 0, alignItems: "flex-start" },
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
                  <IconButton size="small" sx={{ p: 0 }}>
                    <EmojiEmotionsOutlinedIcon
                      sx={{ color: "#8E8E8E", fontSize: "20px" }}
                    />
                  </IconButton>
                  <AppTypography sx={{ color: "#C7C7C7", fontSize: "12px" }}>
                    {caption.length}/2,200
                  </AppTypography>
                </Box>
              </Box>

              {/* BOTTOM BLOCK (Settings) */}
              <Box
                sx={{
                  flex: 1,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  borderTop: "1px solid #DBDBDB", // Серая граница сверху
                  bgcolor: "#FFFFFF",
                }}
              ></Box>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreatePostModal;
