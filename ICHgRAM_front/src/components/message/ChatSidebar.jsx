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
import { formatUrl } from "../../helpers.js";

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
    <Box
      sx={{
        width: "350px",
        borderRight: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          itcareerhub
        </Typography>
      </Box>
      <Divider />

      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          <List disablePadding>
            {contacts.map((contact) => (
              <ListItem
                button
                key={contact._id}
                selected={selectedChatId === contact._id}
                onClick={() => onSelectChat(contact)}
                sx={{ py: 1.5 }}
              >
                <ListItemAvatar>
                  <Avatar src={formatUrl(contact.avatar)} />
                </ListItemAvatar>

                <ListItemText>
                  primary={contact.username}
                  secondary="Active now" primaryTypographyProps=
                  {{ fontWeight: 600, fontSize: "0.9rem" }}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default ChatSidebar;
