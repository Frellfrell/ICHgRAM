import React from 'react';
import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const PostGridItem = ({ post, onClick }) => {
  const BE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";