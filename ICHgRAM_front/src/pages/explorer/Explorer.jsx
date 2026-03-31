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
          ...post,
          layout: (index + 1) % 3 === 0 ? "vertical" : "square",
        }));

        setPosts(masonryPosts);
      } catch (err) {
        console.error("Ошибка при загрузке Explorer:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const formatUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("data:") || url.startsWith("http")) return url;
    return `${BE_URL.replace(/\/$/, "")}${url.startsWith("/") ? url : "/" + url}`;
  };

  return (
    <MainLayout>
      <Box
        sx={{
          width: "100%",
          maxWidth: "975px",
          minHeight: "1376px",
          pl: "103px",
          pt: "41px",
          boxSizing: "border-box",
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              // Сетка 3 колонки по 316px
              gridTemplateColumns: "repeat(3, 316px)",
              // Базовая высота строки 316px
              gridAutoRows: "316px",
              gap: "13px",
            }}
          >
            {posts.map((post) => (
              <Box
                key={post._id}
                onClick={() => setSelectedPost(post)}
                sx={{
                  // Если layout vertical — занимаем 2 строки
                  gridRow: post.layout === "vertical" ? "span 2" : "span 1",
                  cursor: "pointer",
                  overflow: "hidden",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <Box
                  component="img"
                  src={formatUrl(post.image)}
                  alt="post"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.02)" },
                  }}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Модалка с постом */}

      <PostModal
        open={!!selectedPost}
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </MainLayout>
  );
};

export default Explorer;
