import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  CircularProgress,
} from "@mui/material";
import axiosInstance from "../../api/axiosInstance";
import { formatUrl } from "../../utils/formatUrl";

const ChatSidebar = ({ onSelectChat, selectedChatId }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Запрос к списку подписок
        const res = await axiosInstance.get("/api/follows/following"); 
        setContacts(res.data); 
      } catch (err) {
        console.error("Ошибка при загрузке контактов:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  return (
    <Box sx={{ 
      width: "350px", 
      borderRight: "1px solid", 
      borderColor: "divider", 
      display: "flex", 
      flexDirection: "column" 
    }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}></Typography>
