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
import { formatUrl } from "../ui/helpers";
import { SocketContext } from "../../context/SocketContext";

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
          const res = await axiosInstance.get(
            `/api/messages/${selectedChat._id}`,
          );
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
        (newMessage.sender === currentUserId &&
          newMessage.receiver === selectedChat?._id);

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
      text: text.trim(),
    });
    setText("");
  };

  if (!selectedChat)
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Your Messages
        </Typography>
        <Typography color="text.secondary">
          Select a friend to start chatting
        </Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        bgcolor: "white",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #dbdbdb",
        }}
      >
        <Avatar
          src={formatUrl(selectedChat.avatar)}
          sx={{ mr: 2, width: 32, height: 32 }}
        />
        <Typography fontWeight={600}>{selectedChat.username}</Typography>
      </Box>

      {/* Messages Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Info Header */}
        <Box sx={{ textAlign: "center", my: 4 }}>
          <Avatar
            src={formatUrl(selectedChat.avatar)}
            sx={{ width: 96, height: 96, mx: "auto", mb: 1 }}
          />
          <Typography variant="h6" fontWeight="bold">
            {selectedChat.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ICHgRam User
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              display: "inline-block",
              px: 2,
              py: 0.5,
              mt: 1,
              cursor: "pointer",
              borderRadius: 2,
            }}
          >
            View profile
          </Paper>
        </Box>

        {messages.map((msg, idx) => {
          const isMe = msg.sender === currentUserId;
          return (
            <Box
              key={msg._id || idx}
              sx={{
                alignSelf: isMe ? "flex-end" : "flex-start",
                maxWidth: "70%",
                mb: 1,
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: "18px",
                  bgcolor: isMe ? "secondary.main" : "#efefef",
                  color: isMe ? "white" : "black",
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
              </Box>
            </Box>
          );
        })}
        <div ref={scrollRef} />
      </Box>

      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          placeholder="Write message..."
          size="small"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          InputProps={{
            sx: { borderRadius: "25px" },
            endAdornment: (
              <IconButton onClick={handleSend}>
                <SendIcon sx={{ color: "secondary.main" }} />
              </IconButton>
            ),
          }}
        />
      </Box>
    </Box>
  );
};
