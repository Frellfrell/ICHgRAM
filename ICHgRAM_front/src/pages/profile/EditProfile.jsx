import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Avatar,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import MainLayout from "../../layouts/MainLayout";
import AppTypography from "../ui/AppTypography";
import axiosInstance from "../../api/axiosInstance";
import { formatUrl } from "../ui/helpers";
import { useNavigate } from "react-router-dom";
import AppButton from "../ui/AppButton";
import LinkIcon from "@mui/icons-material/Link";


const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // Загрузка начальных данных
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    bio: "",
    website: "",
    avatar: ""
  });

const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState(""); // Для отображения ошибок (например, не правильное имя )