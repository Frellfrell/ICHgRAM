import React from "react";
import MainLayout from "../../layout/MainLayout";
import PostCard from "../../components/post/PostCard";
import { fetchAllPosts } from "../../api/postApi";
import { Box, CircularProgress } from "@mui/material";

const Home = () => {
  return (
    <MainLayout>
      <div>Здесь будет лента постов</div>
    </MainLayout>
  );
};

export default Home;
