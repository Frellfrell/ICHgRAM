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
