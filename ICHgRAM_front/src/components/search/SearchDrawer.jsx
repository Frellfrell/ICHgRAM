import React from "react";
import { Box, Typography, IconButton, InputBase } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


export const SearchDrawer = ({ open, onClose, results }) => {
  if (!open) return null;

  