import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axiosInstance from "../../api/axiosInstance";




const FollowButton = ({ userId, initialIsFollowing }) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [loading, setLoading] = useState(false);


  const handleFollow = async (e) => {
    e.stopPropagation();
    setLoading(true);
    try {
      if (isFollowing) {

        await axiosInstance.delete(`/api/follows/${userId}`);
        setIsFollowing(false);
      } else {
        await axiosInstance.post(`/api/follows/${userId}`);
        setIsFollowing(true);
      }
      