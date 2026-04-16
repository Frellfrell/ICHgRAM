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
//import ActionsModal from "../create/ActionsModal";
import ActionsPopover from "../create/ActionsPopover.jsx";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";

const PostModal = ({ open, post, onClose, onEditSubmit }) => {
  console.log("PostModal props:", { open, post, onEditSubmit });
  console.log("PostModal file loaded from: ../components/ui/PostModal.jsx");
  console.log("onEdit type in PostModal:", typeof onEdit);
  console.log("PostModal file loaded from: ../components/ui/PostModal.jsx");

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);

  //const [isActionsOpen, setIsActionsOpen] = useState(false); // Для открытия ActionsModal

  // Достаем текущего юзера из localStorage, чтобы сравнить ID
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const myId = currentUser?._id || currentUser?.id;

  const navigate = useNavigate();

  const postId = post?._id;
  const author = post?.author || {};

  // Проверка: является ли текущий юзер автором поста
  const isMyPost = String(myId) === String(author?._id || author);

  // 1. Загружаем комментарии при открытии модалки
  useEffect(() => {
    // if (open && post?._id) {
    if (!open || !postId) return;
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get(`/api/comments/${postId}`);
        setComments(res.data);
      } catch (err) {
        console.error("Ошибка загрузки комментариев:", err);
      }
    };
    fetchComments();
  }, [open, postId]);

  if (!open || !postId) return null;

  // 2. Функция отправки нового комментария
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axiosInstance.post(`/api/comments/${postId}`, {
        text: newComment,
      });
      setComments((prev) => [...prev, res.data]); // Добавляем в список локально
      setNewComment(""); // Очищаем поле
    } catch (err) {
      console.error("Ошибка отправки комментария:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Delete this post?"))
      try {
        await axiosInstance.delete(`/api/posts/${postId}`);
        //setIsActionsOpen(false);

        onClose(); // Закрываем модалку после удаления
        window.location.reload(); // Перезагружаем страницу, чтобы обновить ленту
      } catch (err) {
        console.error("Error deleting post:", err);
      }
  };
  {
    /*  const handleEditOpen = () => {
    console.log("EDIT CLICKED", post);
    console.log("onEdit exists:", !!onEdit);
    console.log("post exists:", !!post);
    setIsActionsOpen(false);
    if (onEdit && post) {
      //onClose();
      console.log("CALLING onEdit");
      onEdit(post);
    }
  };*/
  }
  const handleOpenActions = (e) => {
    e.stopPropagation();
    e.currentTarget.blur();
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        slotProps={{
          backdrop: {
            sx: {
              left: { xs: "0px", md: "245px" },
              bottom: "158px",
              backgroundColor: "rgba(0, 0, 0, 0.65)",
            },
          },
        }}
        sx={{
          left: { xs: "0px", md: "245px" },
          bottom: "158px",
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
            boxShadow: "0 12px 42px rgba(0,0,0,0.2)",
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
              <Box
                onClick={() => {
                  navigate(`/profile/${author._id}`);
                  onClose(); // Закрываем модалку при переходе
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
                  flexGrow: 1,
                }}
              >
                <AppAvatar src={formatUrl(author.avatar)} size={32} />
                <AppTypography sx={{ fontWeight: 600, fontSize: "14px" }}>
                  {author.username}
                </AppTypography>
              </Box>

              {!isMyPost && (
                <FollowButton
                  userId={author._id}
                  //initialIsFollowing={author.isFollowed}
                />
              )}

              {/* ГРУППА КНОПОК В УГЛУ */}
              <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
                {isMyPost ? (
                  <IconButton
                    onClick={handleOpenActions}
                    //{(e) => {
                    // e.stopPropagation();
                    //e.currentTarget.blur();
                    //setIsActionsOpen(true);
                    // }
                  >
                    <MoreHorizIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation(); // Чтобы не сработал переход
                      onClose();
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Divider />

            {/* POST CAPTION */}
            <Box
              sx={{ p: 2, display: "flex", gap: 1 }}
              onClick={() => {
                navigate(`/profile/${author._id}`);
                onClose();
              }}
            >
              <AppAvatar src={formatUrl(author.avatar)} size={32} />
              <AppTypography>
                <b>{author.username}</b> {post.caption}
              </AppTypography>
            </Box>

            {/* Комментарии */}
            <Box
              sx={{
                p: 2,
                flexGrow: 1,
                overflowY: "auto",
              }}
            >
              {/* Сами комментарии из базы */}
              {comments.map((c) => (
                <CommentItem
                  key={c._id}
                  comment={c}
                  // onClose={onClose}
                  //handleAvatarClick={handleAvatarClick}
                />
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
          </Box>
        </Box>
      </Modal>

      {/*<ActionsModal
        open={isActionsOpen}
        onClose={() => setIsActionsOpen(false)}
        onDelete={handleDelete}
        onEdit={onEdit}
        //onEdit={handleEditOpen}
      />*/}
      <ActionsPopover
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        onDelete={handleDelete}
        onEditSubmit={onEditSubmit}
      />
    </>
  );
};

export default PostModal;
