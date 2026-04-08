import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  IconButton,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AppTypography from "../ui/AppTypography";
import AppAvatar from "../ui/AppAvatar";
import LikeButton from "../ui/LikeButton";
import FollowButton from "../ui/FollowButton";
import CommentItem from "../comment/CommentItem";
import axiosInstance from "../../api/axiosInstance";
import { formatUrl, timeAgo } from "../ui/helpers";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ActionsModal from "../create/ActionsModal";
import CreatePostModal from "../layout/CreatePostModal";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const PostModal = ({ open, post, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [isActionsOpen, setIsActionsOpen] = useState(false); // Для открытия ActionsModal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newCaption, setNewCaption] = useState(post?.caption || "");

  // Достаем текущего юзера из localStorage, чтобы сравнить ID
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const author = post?.author || {};

  // Проверка: является ли текущий юзер автором поста
  const isMyPost = currentUser?._id === author?._id;

  // 1. Загружаем комментарии при открытии модалки
  useEffect(() => {
    if (open && post?._id) {
      const fetchComments = async () => {
        try {
          const res = await axiosInstance.get(`/api/comments/${post._id}`);
          setComments(res.data);
        } catch (err) {
          console.error("Ошибка загрузки комментариев:", err);
        }
      };
      fetchComments();
    }
  }, [open, post?._id]);

  // 2. Функция отправки нового комментария
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axiosInstance.post(`/api/comments/${post._id}`, {
        text: newComment,
      });
      setComments((prev) => [...prev, res.data]); // Добавляем в список локально
      setNewComment(""); // Очищаем поле
    } catch (err) {
      console.error("Ошибка отправки комментария:", err);
    }
  };

  const author = post.author || {};

  const handleDelete = async () => {
    if (window.confirm("Delete this post?"))
      try {
        await axiosInstance.delete(`/api/posts/${post._id}`);
        setIsActionsOpen(false);
        onClose(); // Закрываем модалку после удаления
        window.location.reload(); // Перезагружаем страницу, чтобы обновить ленту
      } catch (err) {
        console.error("Error deleting post:", err);
      }
  };
  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/api/posts/${post._id}`, {
        caption: newCaption,
      });
      setIsActionsOpen(false);
      // Логика завершения редактирования
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (!post) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: { sx: { backgroundColor: "rgba(0, 0, 0, 0.7)" } },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          // АДАПТИВНАЯ ШИРИНА
          flexDirection: { xs: "column", md: "row" },
          width: { xs: "95vw", md: "1112px" },
          height: { xs: "auto", md: "722px" },
          maxHeight: { xs: "90vh", md: "722px" },

          bgcolor: "background.paper",
          outline: "none",
          borderRadius: "3.39px",
          overflow: "hidden",
        }}
      >
        {/* ЛЕВАЯ ЧАСТЬ: ИЗОБРАЖЕНИЕ */}
        <Box
          sx={{
            width: { xs: "100%", md: "577.6px" },
            height: { xs: "300px", md: "722px" },
            bgcolor: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={formatUrl(post.image)}
            alt="post"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        {/* ПРАВАЯ ЧАСТЬ: КОНТЕНТ */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            borderLeft: { xs: "none", md: "0.85px solid #dbdbdb" },
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <AppAvatar src={formatUrl(author.avatar)} size={32} />
            <AppTypography sx={{ fontWeight: 600, fontSize: "14px" }}>
              {author.username}
            </AppTypography>
            {!isMyPost && <FollowButton userId={author._id} />}
            {/* <IconButton onClick={onClose} sx={{ ml: "auto" }}>
              <CloseIcon />
            </IconButton> */}
            {/* ГРУППА КНОПОК В УГЛУ */}
            <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
              {isMyPost && (
                <IconButton onClick={() => setIsActionsOpen(true)}>
                  <MoreHorizIcon />
                </IconButton>
              )}
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Divider />

          {/* Комментарии */}
          <Box
            sx={{
              p: 2,
              flexGrow: 1,
              overflowY: "auto",
            }}
          >
            <CommentItem
              comment={{
                text: post.caption,
                author: author,
                createdAt: post.createdAt,
              }}
            />

            {/* Сами комментарии из базы */}
            {comments.map((c) => (
              <CommentItem key={c._id} comment={c} />
            ))}
          </Box>
          <Divider />

          {/* Лайки */}
          <Box sx={{ p: "12px 16px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <LikeButton
                postId={post._id}
                initialLikesCount={post.likesCount}
              />
              <IconButton
                sx={{
                  p: 0,
                  alignSelf: "flex-start",
                  mt: 1.5,
                  color: "text.primary",
                }}
              >
                <ChatBubbleOutlineIcon sx={{ fontSize: 24 }} />
              </IconButton>
            </Box>
            <AppTypography
              sx={{
                fontWeight: 700,
                fontSize: "14px",
                color: "text.secondary",
              }}
            >
              {timeAgo(post.createdAt).replace(" ago", "")}
            </AppTypography>
          </Box>

          <Divider />

          {/* Блок добавления комментария */}
          <Box
            sx={{
              height: "45px",
              display: "flex",
              alignItems: "center",
              px: 2,
              gap: 1,
            }}
          >
            <SentimentSatisfiedAltIcon sx={{ color: "#262626" }} />
            <TextField
              placeholder="Add comment"
              variant="standard"
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              InputProps={{ disableUnderline: true }}
            />
            <Button
              onClick={handleAddComment}
              sx={{
                color: "#0095F6",
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Send
            </Button>
          </Box>
          <ActionsModal
            open={isActionsOpen}
            onClose={() => setIsActionsOpen(false)}
            onDelete={handleDelete} // Передаем функцию удаления
            onEdit={() => {
              setIsActionsOpen(false);
              setIsEditModalOpen(true); // Открываем окно редактирования
            }}
          />
          {/* МОДАЛКА САМОГО РЕДАКТИРОВАНИЯ (CreatePostModal в режиме edit) */}
          <CreatePostModal
            open={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            editPost={post} // Передаем пост для правки
            user={currentUser}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default PostModal;
