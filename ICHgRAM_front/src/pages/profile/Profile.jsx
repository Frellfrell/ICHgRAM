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
      }