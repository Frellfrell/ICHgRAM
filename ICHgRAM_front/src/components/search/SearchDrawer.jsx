import React from "react";
import { Box, Typography, IconButton, InputBase } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchResults from "./SearchResults.jsx";
import axios from "axios";

export const SearchDrawer = ({ open, onClose, results, onSearchChange }) => {
  
const [searchValue, setSearchValue] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;

    setSearchValue(value);
    onSearchChange(value); // Вызываем функцию из MainLayout для обновления результатов
  };
   
  if (!open) return null;

  return (
    <>
      <Box
        onClick={onClose}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.65)",
          zIndex: 999,
        }}
      />
      {/* Drawer */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 245,
          width: 397,
          height: 900,
          backgroundColor: "#fff",
          padding: 2,
          zIndex: 1000,
          boxShadow: "2px 0 8px rgba(0,0,0,0.2)",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Search</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {/* Input */}
        <Box
          sx={{
            mb: 3,
            display: "flex",
            alignItems: "center",
            border: "1px solid rgba(219,219,219,1)",
            borderRadius: 1,
            p: 1,
          }}
        >
          <InputBase
            placeholder="Search"
            sx={{ ml: 1, flex: 1 }}
            onChange={handleChange}  // проверка по букве
          />
        </Box>

        
          ))}
        </Box>
      </Box>
    </>
  );
};
