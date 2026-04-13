import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axiosInstance from "../../api/axiosInstance";

const FollowButton = ({ userId, initialIsFollowing, onFollowChange }) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [loading, setLoading] = useState(false);

  //Обновляеь стейт кнопкт при преходе на другой профиль, иначе при открытии нового профиля кнопка будет показывать статус предыдущего
  useEffect(() => {
    setIsFollowing(initialIsFollowing);
  }, [initialIsFollowing, userId]);

  const handleFollow = async (e) => {
    e.stopPropagation();
    if (!userId || loading) return;

    console.log("Пытаюсь подписаться/отписаться от:", userId);

    setLoading(true);

    try {
      if (isFollowing) {
        await axiosInstance.delete(`/api/follow/${userId}`);
      } else {
        await axiosInstance.post(`/api/follow/${userId}`);
      }

      //  update
      setIsFollowing((prev) => !prev);

      // refetch profile
      if (onFollowChange) {
        onFollowChange();
      }
    } catch (error) {
      console.error("Follow error:", error);
    } finally {
      setLoading(false);
    }
  };
  {
    /* setIsFollowing(false);
      } else {
        await axiosInstance.post(`/api/follows/${userId}`);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Ошибка при подписке/отписке:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };*/
  }

  return (
    <Button
      onClick={handleFollow}
      disabled={loading || !userId}
      sx={{
        color: isFollowing ? "text.primary" : "#0095F6",
        fontWeight: 600,
        fontSize: "14px",
        textTransform: "none",
        minWidth: "auto",
        p: 0,
        "&:hover": { backgroundColor: "transparent", opacity: 0.7 },
      }}
    >
      {isFollowing ? "Following" : "follow"}
    </Button>
  );
};

export default FollowButton;
