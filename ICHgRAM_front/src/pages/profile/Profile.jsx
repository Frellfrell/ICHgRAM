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