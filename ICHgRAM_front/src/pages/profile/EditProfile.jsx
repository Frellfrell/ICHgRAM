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

  // екущие данные пользователя


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/api/users/me");
        setFormData({
          username: res.data.username || "",
          fullName: res.data.fullName || "",
          bio: res.data.bio || "",
          website: res.data.website || "",
          avatar: res.data.avatar || ""
        });
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchUser();
  }, []);

  // Обработка выбора фото
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Отправка формы на бэкенд
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Сбрасываем старую ошибку

    const data = new FormData();
    data.append("username", formData.username);
    data.append("fullName", formData.fullName);
    data.append("bio", formData.bio);
    data.append("website", formData.website);
    if (file) data.append("avatar", file);