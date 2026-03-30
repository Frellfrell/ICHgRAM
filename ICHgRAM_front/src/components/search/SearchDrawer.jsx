import React from "react";
import { Box, Typography, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import SearchResults from "./SearchResults.jsx";

import { useState } from "react";

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
          left: "245px",
          width: "100vw",
          height: "calc(100vh - 158px)",
          backgroundColor: "rgba(0,0,0,0.65)",
          zIndex: 999,
        }}
      />
      {/* Drawer */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: "245px",
          maxWidth: "397px",
          height: "100%",
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
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "24px" }}>
            Search
          </Typography>
          <IconButton onClick={onClose} sx={{ p: 0 }}>
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
          <SearchIcon sx={{ color: "#8E8E8E", fontSize: "20px", mr: "12px" }} />
          <InputBase
            placeholder="Search"
            sx={{ ml: 1, flex: 1 }}
            value={searchValue} // контролируемый компонент
            onChange={handleChange} // проверка по букве
          />
        </Box>

        <SearchResults results={results} />
      </Box>
    </>
  );
};
