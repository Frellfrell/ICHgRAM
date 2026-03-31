import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import MainLayout from "../../layouts/MainLayout";
import axiosInstance from "../../api/axiosInstance";
import PostModal from "../../components/posts/PostModal";



const Explorer = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);



  const BE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get("/api/posts");
        
        // Добавляем разметку: каждый 3-й пост будет высоким (span 2)
        const masonryPosts = res.data.map((post, index) => ({
