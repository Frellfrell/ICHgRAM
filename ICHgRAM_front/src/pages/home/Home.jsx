import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
//import PostCard from "../../components/post/PostCard";
import { fetchAllPosts } from "../../api/postApi";
import { Box, CircularProgress } from "@mui/material";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchAllPosts();
        setPosts(data);
      } catch (err) {
        console.error("Failed to load posts", err);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  return (
    <MainLayout>
      <Box sx={{ maxWidth: "470px", mx: "auto", pt: 5 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </Box>
    </MainLayout>
  );
};

export default Home;
