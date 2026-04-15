import React, { useEffect, useState, useContext } from "react";
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
import { formatUrl, timeAgo } from "../ui/helpers.js";
import { AuthContext } from "../../context/AuthContext.jsx";

const ChatSidebar = ({ onSelectChat, selectedChatId }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Запрос к списку подписок
        const res = await axiosInstance.get("/api/messages/chats");

        console.log("CHATS RESPONSE:", res.data);

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
    <Box
      sx={{
        width: "100%",
        maxWidth: "350px",
        borderRight: "1px solid",
        borderLeft: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ pt: "37px", paddingLeft: "24px" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {user?.username}
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          <List disablePadding>
            {contacts.map((chat) => {
              const contactUser = chat.user;

              if (!contactUser) return null;

              return (
                <ListItem
                  button
                  key={contactUser._id}
                  selected={selectedChatId === contactUser._id}
                  onClick={() => {
                    console.log("Selected chat:", contactUser);
                    onSelectChat(contactUser);
                  }}
                  sx={{
                    py: 1.5,
                    cursor: "pointer",
                    bgcolor:
                      selectedChatId === user._id ? "#efefef" : "transparent",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={formatUrl(contactUser.avatar)} />
                  </ListItemAvatar>

                  {/*<ListItemText>
                  //primary={contact.username}
                  //secondary="Active now" 
                  //primaryTypographyProps=
                  //{{ fontWeight: 600, fontSize: "0.9rem" }}
                //</ListItemText>*/}
                  <ListItemText
                    primary={
                      <Typography sx={{ fontWeight: 600, fontSize: "0.9rem" }}>
                        {contactUser.username}
                      </Typography>
                    }
                    secondary={
                      <Typography sx={{ fontSize: "0.75rem", color: "gray" }}>
                        {chat.lastMessage
                          ? `${chat.lastMessage} • ${timeAgo(chat.createdAt)}`
                          : "No messages yet"}
                      </Typography>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default ChatSidebar;
