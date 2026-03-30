import React from "react";
import { Box, Typography } from "@mui/material";
import AppAvatar from "../ui/AppAvatar";


const SearchResults = ({ results, onUserClick }) => {
  const BE_URL = "http://localhost:5000";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {results?.map((user) => (
                <Box
                  key={user._id}
                  onClick={() => onUserClick(user._id)}