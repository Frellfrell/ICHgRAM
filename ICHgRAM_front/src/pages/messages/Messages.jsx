import React, { useState, useContext } from "react";
import { Box } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import ChatRoom from "../../components/message/ChatRoom";
import ChatSidebar from "../../components/message/ChatSidebar";

const Messages = () => {
  const { user } = useContext(AuthContext); // Достаем текущего юзера
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(100vh - 158px)", // Учитываем отступы MainLayout
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "4px",
        overflow: "hidden",
        width: "100%",
        maxWidth: "1195px",
        mx: "auto",
      }}
    >
      <ChatSidebar
        onSelectChat={setSelectedChat}
        selectedChatId={selectedChat?._id}
      />
      <ChatRoom
        selectedChat={selectedChat}
        currentUserId={user?.id || user?._id}
      />
    </Box>
  );
};

export default Messages;
