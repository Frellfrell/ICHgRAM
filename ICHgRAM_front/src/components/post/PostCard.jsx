import { Box, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AppTypography from "../ui/AppTypography";
import AppAvatar from "../ui/AppAvatar";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { formatUrl, timeAgo, BE_URL } from "../ui/helpers";
import FollowButton from "../ui/FollowButton";
import LikeButton from "../ui/LikeButton";

const PostCard = ({ post }) => {
  // Проверяем, как называется поле автора: post.author или post.user

  const author = post.author || post.user || {}; // Если нет author, берем user или пустой объект

  // полные пути
  const avatarSrc =
    formatUrl(author?.avatar) ||
    `${BE_URL.replace(/\/$/, "")}/avatar/default.svg`;
  const postImgSrc = formatUrl(post.image);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "404px",
        //height: "716.6px",
        //mb: "23px",
        borderBottom: "1px solid",
        borderColor: "divider",
        pb: 2,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* 1. Шапка: AppAvatar, Имя, Время, Follow */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <AppAvatar src={avatarSrc} alt={author?.username} size={27} />
        <AppTypography sx={{ fontWeight: 600, fontSize: "14px" }}>
          {author?.username}
        </AppTypography>
        <AppTypography sx={{ color: "text.secondary", fontSize: "14px" }}>
          • {timeAgo(post.createdAt)}
        </AppTypography>

        {/* Кнопка Follow (показываем только если не подписан) */}
        <Box sx={{ ml: "auto" }}>
          <FollowButton
            userId={author._id}
            initialIsFollowing={author.isFollowed}
          />
        </Box>
      </Box>

      {/* 2. Фото поста */}
      <Box
        component="img"
        //src={`${BE_URL}${post.image}`}
        src={postImgSrc}
        alt="post content"
        sx={{
          //width: "403.8px",
          //height: "505.6px",
          width: "100%",
          height: "auto",
          borderRadius: "4px",
          //display: "block",
          aspectRatio: "4 / 5",
          objectFit: "cover",
        }}
      />

      {/* 3. Кнопки действий */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
        <LikeButton postId={post._id} initialLikesCount={post.likesCount} />

        <IconButton sx={{ color: "text.primary", p: 0.5 }}>
          <ChatBubbleOutlineIcon />
        </IconButton>
      </Box>

      {/* 4. Текст поста */}
      <Box sx={{ mt: 1 }}>
        <AppTypography variant="body2">
          <span style={{ fontWeight: 700, marginRight: "8px" }}>
            {author?.username}
          </span>
          {post.caption}
        </AppTypography>
      </Box>
    </Box>
  );
};

export default PostCard;
