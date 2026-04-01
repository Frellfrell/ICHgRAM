import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Divider,
  CircularProgress,
  Link,
} from "@mui/material";
import MainLayout from "../../layouts/MainLayout";
import AppTypography from "../ui/AppTypography";
import AppAvatar from "../ui/AppAvatar";
import FollowButton from "../ui/FollowButton";
import PostModal from "../posts/PostModal";
import axiosInstance from "../../api/axiosInstance";
import { formatUrl } from "../ui/helpers";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";


const Profile = () => {
  const { id } = useParams(); // ID из URL (для чужих профилей)
  const navigate = useNavigate();


  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMyProfile, setIsMyProfile] = useState(false);

  // Состояние модалки
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        // запрашиваю профиль
        // Если есть id в URL, то запрашиваю чужой профиль, иначе - свой
        const endpoint = id ? `/api/users/${id}` : `/api/users/me`;

        const [userRes, postsRes] = await Promise.all([
          axiosInstance.get(endpoint),
          axiosInstance.get(id ? `/api/posts/user/${id}` : `/api/posts/my-posts`)
        ]);

        setUser(userRes.data);
        setPosts(postsRes.data);

        // Если запрашиваю свой профиль, то isMyProfile = true
        setIsMyProfile(!id);
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return (
    <MainLayout><Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
        </Box>
        </MainLayout>
  );

  if (!user) return 
  <MainLayout>
    <AppTypography sx={{ p: 4 }}>
    User not found
    </AppTypography>
    </MainLayout>;


return (
    <MainLayout>
        <Box sx={{ maxWidth: "975px", mx: "auto", pt: 4, px: { xs: 2, md: 0 } }}>

    {/* HEADER */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, mb: 6 }}>
          <Box sx={{ display: "flex", justifyContent: "center", width: { md: "290px" }, ml: { md: "67px" }, mt: { md: "32px" } }}>
            <AppAvatar src={formatUrl(user.avatar)} size={150} />
          </Box>

        <Box sx={{ flex: 1, pt: { xs: 3, md: 4 }, maxWidth: "621px" }}>
            {/* Top Row: Username + Buttons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3, flexWrap: "wrap" }}>
              <AppTypography variant="h5" sx={{ fontWeight: 300, fontSize: "28px" }}>
                {user.username}
              </AppTypography>

        {isMyProfile ? (
                // КНОПКИ ДЛЯ МОЕГО ПРОФИЛЯ
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                  onClick={() => navigate("/profile/edit")}
                    sx={{ 
                      height: "32px", px: 2,
                       bgcolor: "theme.grey.100",
                        color: "text.primary", 
                      textTransform: "none",
                       fontWeight: 600, border: "1px solid #dbdbdb",
                      "&:hover": { bgcolor: "theme.grey.100" },
                    }}
                  >
                    Edit profile

                  </Button>
                  <IconButton size="small"><SettingsIcon /></IconButton>
                    </Box>

                    ) : (
                // КНОПКИ ДЛЯ ЧУЖОГО ПРОФИЛЯ
                <Box sx={{ display: "flex", gap: 1 }}>
                  <FollowButton userId={user._id} initialIsFollowing={user.isFollowed} />
                  <Button sx={{) : (
                // КНОПКИ ДЛЯ ЧУЖОГО ПРОФИЛЯ
                <Box sx={{ display: "flex", gap: 1 }}>
                  <FollowButton userId={user._id} initialIsFollowing={user.isFollowed} />
                  <Button sx={{
                    height: "32px", px: 3,
                     bgcolor: "primary", color: "text.primary", 
                    textTransform: "none", fontWeight: 600 
                  }}>
                    Message
                  </Button>
                </Box>
                )}
                </Box>

                {/* Stats Row */}
                <Box sx={{ display: "flex", gap: 5, mb: 3 }}>
              <AppTypography><b>{posts.length}</b> posts</AppTypography>
              <AppTypography><b>{user.followersCount || 0}</b> followers</AppTypography>
              <AppTypography><b>{user.followingCount || 0}</b> following</AppTypography>
            </Box>


        </Box>








    </MainLayout>

