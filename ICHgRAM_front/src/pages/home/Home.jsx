import React, { useEffect, useState } from "react";
import PostCard from "../../components/post/PostCard.jsx";
import { fetchAllPosts } from "../../api/postApi";
import { Box, CircularProgress, Grid } from "@mui/material";
import HomeEndBlock from "../../components/ui/HomeEndBlock.jsx";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchAllPosts();
        console.log("Все посты из БД:", data);
        const sashaaOnly = data.filter(
          (post) => post.author?.username === "sashaa_designer",
        );
        console.log("Посты Саши после фильтра:", sashaaOnly);
        setPosts(sashaaOnly);
        //setPosts(data);
      } catch (err) {
        console.error("Failed to load posts", err);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "1195px", pt: "58px", px: "78px" }}>
      {/* Сетка по 2 поста в ряд (xs=12 для мобилки, sm=6 для десктопа) */}
      <Grid
        container
        columnSpacing="39px"
        rowSpacing="23px"
        sx={{
          width: "847px",
        }}
      >
        {posts.map((post) => (
          <Grid item xs={6} key={post._id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
      <HomeEndBlock />
    </Box>
  );
};

export default Home;
