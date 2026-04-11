import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";



import axiosInstance from "../../api/axiosInstance";

const ChatRoom = ({ selectedChat, currentUserId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const socket = useContext(SocketContext);
  const scrollRef = useRef(null);

  // 1. Загрузка истории сообщений при смене чата
  useEffect(() => {
    if (selectedChat) {
      const fetchHistory = async () => {
        try {
          const res = await axiosInstance.get(`/api/messages/${selectedChat._id}`);
          setMessages(res.data);
        } catch (err) {
          console.error("History load error:", err);
        }
      };
      fetchHistory();
    }
  }, [selectedChat]);

  // 2. Слушатель сокета
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      // Проверяем: сообщение относится к ЭТОМУ открытому диалогу?
      const isRelevant = 
        newMessage.sender === selectedChat?._id || 
        (newMessage.sender === currentUserId && newMessage.receiver === selectedChat?._id);

       if (isRelevant) {
        setMessages((prev) => [...prev, newMessage]);
      }
    }; 

    socket.on("receiveMessage", handleNewMessage);
    return () => socket.off("receiveMessage", handleNewMessage);
  }, [socket, selectedChat, currentUserId]);

  // 3. Скролл
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim() || !socket || !selectedChat) return;

    socket.emit("sendMessage", {
      receiverId: selectedChat._id,
      text: text.trim()
    });
    setText("");
  };


  if (!selectedChat) return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Typography variant="h5" fontWeight="bold">Your Messages</Typography>
      <Typography color="text.secondary">Select a friend to start chatting</Typography>
    </Box>
  );


  return (