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

    try {
      await axiosInstance.put("/api/users/update", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });


      // уведомление об успехе
      navigate("/profile"); 
    } catch (err) {
      console.error("Ошибка обновления:", err);
      // Если бэкенд вернул ошибку уникальности (400)
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Update failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  if (fetching) return 
  <MainLayout>
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
  <CircularProgress />
  </Box>
  </MainLayout>;

    return (
    <MainLayout>
            <Box sx={{ 
        maxWidth: "944px", 
        width: "100%",
        minHeight: "740px", 
        mx: "auto", 
        mt: "32px",
        mb: "32px",
        bgcolor: "background.paper",
        borderRadius: "8px",
        p: "24px", // Внутренний паддинг
        display: "flex",
        flexDirection: "column",
        alignItems: "center" // Центрируем контент внутри
      }}> 

      {/* Заголовок "Edit profile" (слева) */}
        <Box sx={{ width: "100%",
             maxWidth: "610px",
              mb: "32px",
               alignSelf: "center" }}>
           <AppTypography variant="h5" sx={{
             fontWeight: 700,
              fontSize: "24px",
               textAlign: "left" }}>
             Edit profile
           </AppTypography>
        </Box>


        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "610px" }}>
      
      {/* Блок аватара (серый фон, 610x88, radius 20px) */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "16px", 
            p: "14px 24px",
            mb: "24px", 
            bgcolor: "theme.grey.100",
            borderRadius: "20px",
            width: "610px",
            height: "88px",
            boxSizing: "border-box"
             }}
             >
      
      
      
      
      
      
      
      
      </Box>







    </MainLayout>