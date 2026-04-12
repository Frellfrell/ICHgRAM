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
import { formatUrl } from "../ui/helpers.js";
import { AuthContext } from "../../context/AuthContext.jsx";

const ChatSidebar = ({ onSelectChat, selectedChatId }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

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
            {contacts.map((contact) => {
              const user = contact.following;

              return (
                <ListItem
                  button
                  key={contact._id}
                  selected={selectedChatId === contact._id}
                  onClick={() => onSelectChat(user)}
                  sx={{
                    py: 1.5,
                    cursor: "pointer",
                    bgcolor:
                      selectedChatId === user._id ? "#efefef" : "transparent",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={formatUrl(user.avatar)} />
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
                        {user.username}
                      </Typography>
                    }
                    secondary={
                      <Typography sx={{ fontSize: "0.75rem", color: "gray" }}>
                        • 2 hours ago
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
