import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axiosInstance from "../../api/axiosInstance";




const FollowButton = ({ userId, initialIsFollowing }) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [loading, setLoading] = useState(false);