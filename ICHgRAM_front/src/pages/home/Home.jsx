import React, { useEffect, useState } from "react";
import PostCard from "../../components/post/PostCard.jsx";
import { fetchAllPosts } from "../../api/postApi";
import { Box, CircularProgress, Grid } from "@mui/material";
import HomeEndBlock from "../../components/ui/HomeEndBlock.jsx";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getPosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      // Передаем текущую страницу и лимит 4
      const data = await fetchAllPosts(page, 4);

      if (data.length < 4) {
        setHasMore(false); // Если пришло меньше 4 постов, значит это конец
      }

      setPosts((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("Failed to load posts", err);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  // Первая загрузка
  useEffect(() => {
    getPosts();
  }, []);

  // Логика бесконечного скролла
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      // Если до конца страницы осталось меньше 100px — грузим еще
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        getPosts();
      }
    };

  {
    /*useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchAllPosts();
        console.log("Все посты из БД:", data);

        setPosts(data);
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
  }*/
  }

  return (
    <>
      {/* Сетка по 2 поста в ряд (xs=12 для мобилки, sm=6 для десктопа) */}
      <Grid
        container
        columnSpacing="39px"
        rowSpacing="23px"
        sx={{
          width: "100%",
          maxWidth: "847px",
          mb: "23px",
        }}
      >
        {posts.map((post) => (
          <Grid item xs={6} key={post._id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
      <HomeEndBlock />
    </>
  );
};

export default Home;
