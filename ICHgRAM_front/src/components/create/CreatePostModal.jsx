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