import React, { useState, useContext } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ChatRoom from "../../components/message/ChatRoom";
import ChatSidebar from "../../components/message/ChatSidebar";

const Messages = () => {
  const { user } = useContext(AuthContext); // Достаем текущего юзера
  const { userId } = useParams();
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(100vh - 158px)", // Учитываем отступы MainLayout
        bgcolor: "background.paper",
        borderRadius: "4px",
        overflow: "hidden",
        width: "100%",
        maxWidth: "1195px",
        m: 0,
        p: 0,
      }}
    >
      <ChatSidebar
        onSelectChat={setSelectedChat}
        selectedChatId={selectedChat?._id}
        targetUserId={userId}
      />
      <ChatRoom
        selectedChat={selectedChat}
        currentUserId={user?.id || user?._id}
      />
    </Box>
  );
};

export default Messages;
