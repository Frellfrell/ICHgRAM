import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  IconButton,
  CircularProgress,
  Link,
} from "@mui/material";
import MainLayout from "../../layout/MainLayout";
import AppTypography from "../../components/ui/AppTypography";
import AppAvatar from "../../components/ui/AppAvatar";
import FollowButton from "../../components/ui/FollowButton";
import PostModal from "../../components/ui/PostModal";
import axiosInstance from "../../api/axiosInstance";
import { formatUrl } from "../../components/ui/helpers";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";

const Profile = () => {
  const { userId } = useParams(); // ID из URL (для чужих профилей)
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isMyProfile, setIsMyProfile] = useState(false);

  // Состояние модалки
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //useEffect(() => {
  const fetchProfile = async () => {
    setLoading(true);
    try {
      // запрашиваю профиль
      // Если в URL нет userId, значит мы идем на /profile (это "Я")
      const targetUrl = userId ? `/api/users/${userId}` : `/api/users/me`;
      //const targetUrl = `/api/users/${userId}`;

      const userRes = await axiosInstance.get(targetUrl);
      setUser(userRes.data);

      // 2. Проверяем, мой ли это профиль (для отображения кнопки Edit)
      // Если мы запрашивали /me или если ID из базы совпал с ID в URL
      if (
        !userId ||
        userRes.data._id === String(localStorage.getItem("userId"))
      ) {
        setIsMyProfile(true);
      } else {
        setIsMyProfile(false);
      }

      // 3. Загружаем посты этого пользователя по его ID
      const postsRes = await axiosInstance.get(
        `/api/posts/user/${userRes.data._id}`,
      );
      setPosts(postsRes.data);
    } catch (error) {
      console.error("Error loading profile:", error);
      // Если ошибка 404 (пользователь не найден), перенаправляем на NotFound
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
    const refreshProfile = () => fetchProfile();
    window.addEventListener("postCreated", refreshProfile);

    return () => {
      window.removeEventListener("postCreated", refreshProfile);
    };
  }, [userId]);

  if (loading)
    return (
      <MainLayout>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <CircularProgress />
        </Box>
      </MainLayout>
    );

  if (!user) {
    return (
      <MainLayout>
        <AppTypography sx={{ p: 4 }}>User not found</AppTypography>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box sx={{ maxWidth: "975px", mx: "auto", pt: 4, px: { xs: 2, md: 0 } }}>
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            mb: 6,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: { md: "290px" },
              //ml: { md: "67px" },
              mt: { md: "32px" },
            }}
          >
            <AppAvatar src={formatUrl(user.avatar)} size={150} />
          </Box>

          <Box sx={{ flex: 1, pt: { xs: 3, md: 4 }, maxWidth: "621px" }}>
            {/* Top Row: Username + Buttons */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 3,
                flexWrap: "wrap",
              }}
            >
              <AppTypography
                variant="h5"
                sx={{ fontWeight: 300, fontSize: "28px" }}
              >
                {user.username}
              </AppTypography>

              {isMyProfile ? (
                // КНОПКИ ДЛЯ МОЕГО ПРОФИЛЯ
                <Box sx={{ display: "flex", gap: 3 }}>
                  <Button
                    onClick={() => navigate("/profile/edit")}
                    sx={{
                      width: "100%",
                      maxWidth: "168px",
                      height: "32px",
                      px: 2,
                      bgcolor: "grey.100",
                      color: "text.primary",
                      textTransform: "none",
                      fontWeight: 600,
                      //border: "1px solid #dbdbdb",
                      "&:hover": { bgcolor: "text.secondary" },
                    }}
                  >
                    Edit profile
                  </Button>
                </Box>
              ) : (
                // КНОПКИ ДЛЯ ЧУЖОГО ПРОФИЛЯ
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                  }}
                >
                  <FollowButton
                    userId={user._id}
                    initialIsFollowing={user.isFollowed}
                    onFollowChange={fetchProfile}
                    sx={{
                      width: "100%",
                      maxWidth: "93px",
                      height: "32px",
                      px: 2,
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      textTransform: "none",
                      fontWeight: 600,
                      //border: "1px solid #dbdbdb",
                      "&:hover": { bgcolor: "rgb(3, 134, 222)" },
                    }}
                  />
                  <Button
                    onClick={() => navigate(`/messages`)}
                    sx={{
                      width: "100%",
                      maxWidth: "190px",
                      height: "32px",
                      px: 2,
                      bgcolor: "grey.100",
                      color: "text.primary",
                      textTransform: "none",
                      fontWeight: 600,
                      //border: "1px solid #dbdbdb",
                      "&:hover": { bgcolor: "text.secondary" },
                    }}
                  >
                    Message
                  </Button>
                </Box>
              )}
            </Box>

            {/* Stats Row */}
            <Box sx={{ display: "flex", gap: 5, mb: 3 }}>
              <AppTypography>
                <b>{posts.length}</b> posts
              </AppTypography>
              <AppTypography>
                <b>{user.followersCount || 0}</b> followers
              </AppTypography>
              <AppTypography>
                <b>{user.followingCount || 0}</b> following
              </AppTypography>
            </Box>

            {/* Bio Row */}
            <Box>
              <AppTypography sx={{ fontWeight: 600 }}>
                {user.fullName || user.username}
              </AppTypography>
              <AppTypography
                sx={{
                  whiteSpace: "pre-wrap",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {user.bio}
              </AppTypography>
              {user.website && (
                <Link
                  href={user.website}
                  target="_blank"
                  sx={{
                    color: "#00376b",
                    fontWeight: 600,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mt: 1,
                  }}
                >
                  <LanguageIcon sx={{ fontSize: 16 }} />{" "}
                  {user.website.replace(/^https?:\/\//, "")}
                </Link>
              )}
            </Box>
          </Box>
        </Box>

        {/* POSTS GRID */}
        <Grid
          container
          spacing={1}
          sx={{
            mt: 2,
            width: "100%",
            minHeight: "400px",

            alignItems: "flex-start",
            alignContent: "flex-start",
          }}
        >
          {posts.length > 0 ? (
            posts.map((post) => (
              <Grid
                item
                xs={4}
                key={post._id}
                sx={{ aspectRatio: "1/1", padding: "4px" }}
              >
                <Box
                  onClick={() => {
                    //if (post && post._id && post.author) {
                    setSelectedPost(post);
                    setIsModalOpen(true);
                  }}
                  sx={{
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    overflow: "hidden",
                    "&:hover": { filter: "brightness(0.8)" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#efefef",
                  }}
                >
                  <img
                    src={formatUrl(post.image)}
                    alt="post"
                    style={{
                      display: "block",
                      width: "100%",
                      maxWidth: "304px",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Grid>
            ))
          ) : (
            <AppTypography sx={{ p: 4, width: "100%", textAlign: "center" }}>
              No posts yet
            </AppTypography>
          )}
        </Grid>

        {selectedPost && (
          <PostModal
            open={isModalOpen}
            post={selectedPost}
            onClose={() => setIsModalOpen(false)}
            onPostCreated={handlePostCreated}
          />
        )}
      </Box>
    </MainLayout>
  );
};

export default Profile;
