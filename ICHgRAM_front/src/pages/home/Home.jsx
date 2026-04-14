import React, { useEffect, useState, useCallback, useRef } from "react";
import PostCard from "../../components/post/PostCard.jsx";
import { fetchAllPosts } from "../../api/postApi";
import { Grid } from "@mui/material";
import HomeEndBlock from "../../components/ui/HomeEndBlock.jsx";
import PostModal from "../../components/ui/PostModal.jsx";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const [activePost, setActivePost] = useState(null);

  //const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  //const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Якорь для скролла
  const pageRef = useRef(1);
  const loaderRef = useRef(null);

  const getPosts = useCallback(
    async (isFirstLoad = false) => {
      if (loading || (!hasMore && !isFirstLoad)) return;
      //if (loading) return;
      //if (!hasMore && !isFirstLoad) return;

      setLoading(true);

      // Берем номер страницы: либо 1 (если первая загрузка), либо из Ref
      const currentPage = isFirstLoad ? 1 : pageRef.current;

      console.log("ОТПРАВКА ЗАПРОСА: страница", currentPage);

      try {
        //console.log("Запрос пошел: страница", page);
        //const currentPage = isFirstLoad ? 1 : page;
        //console.log("ОТПРАВКА ЗАПРОСА: страница", currentPage);
        // Передаем текущую страницу и лимит 4
        const data = await fetchAllPosts(currentPage, 4);
        console.log(`Пришло постов со страницы ${currentPage}:`, data.length);

        if (!data || data.length === 0) {
          setHasMore(false);
        } else {
          if (data.length < 4) setHasMore(false);

          setPosts((prev) => {
            if (isFirstLoad) return data;
            {
              /*const newItems = data.filter(
            (newItem) => !prev.some((p) => p._id === newItem._id),
          );
          return [...prev, ...newItems];
        });
        setPage((prev) => prev + 1);*/
            }
            const existingIds = new Set(prev.map((p) => p._id));
            const uniqueNewPosts = data.filter((p) => !existingIds.has(p._id));
            return [...prev, ...uniqueNewPosts];
            // return isFirstLoad ? data : [...prev, ...uniqueNewPosts];
            // });

            //setPage(isFirstLoad ? 2 : (prev) => prev + 1);
            //setPage((prev) => (isFirstLoad ? 2 : prev + 1));
            //const nextPage = currentPage + 1;
            //setPage(nextPage);
            //pageRef.current = nextPage;
          });
          // Мгновенно обновляем номер следующей страницы в Ref
          pageRef.current = isFirstLoad ? 2 : currentPage + 1;
        }
      } catch (err) {
        console.error("Failed to load posts", err);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore],
  );

  // Первая загрузка
  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Если "якорь" loaderRef появился в поле зрения — вызываем загрузку
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loading &&
          posts.length > 0
        ) {
          getPosts();
        }
      },
      { threshold: 0.1 }, // Срабатывает, как только край блока показался на экране
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [getPosts, hasMore, loading, posts.length]);

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
          //height: "fit-content",
          pt: "58px",
          paddingLeft: { xs: "20px", md: "78px" },
          mb: "23px",
        }}
      >
        {posts.map((post, index) => (
          <Grid size={{ xs: 12, sm: 6 }} key={`${post._id}-${index}`}>
            <PostCard
              post={post}
              onPostClick={(p) => setActivePost(p)}
              onOpenComments={(p) => setActivePost(p)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Маяк (невидимый div) */}
      <div ref={loaderRef} style={{ height: "10px", margin: "20px 0" }} />
      <HomeEndBlock />

      {activePost && (
        <PostModal
          open={!!activePost}
          post={activePost}
          onClose={() => setActivePost(null)}
        />
      )}
    </>
  );
};

export default Home;
