import {
  Modal,
  Box,
  IconButton,
  Divider,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AppTypography from "../ui/AppTypography";
import AppAvatar from "../ui/AppAvatar";
import LikeButton from "../ui/LikeButton";
import FollowButton from "../ui/FollowButton";

const PostModal = ({ open, post, onClose }) => {
  const BE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const author = post.author || {};

  const formatUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("data:") || url.startsWith("http")) return url;
    return `${BE_URL.replace(/\/$/, "")}${url.startsWith("/") ? url : "/" + url}`;
  };

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
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
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
            <IconButton onClick={onClose} sx={{ ml: "auto" }}>
              <CloseIcon />
            </IconButton>
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
            <Box sx={{ display: "flex", gap: "14px", mb: 2 }}>
              <AppAvatar src={formatUrl(author.avatar)} size={32} />
              <AppTypography variant="body2" sx={{ fontSize: "14px" }}>
                <span style={{ fontWeight: 700, marginRight: "8px" }}>
                  {author.username}
                </span>
                {post.caption}
              </AppTypography>
            </Box>
          </Box>
          <Divider />

          {/* Лайки */}
          <Box sx={{ p: "12px 16px" }}>
            <LikeButton postId={post._id} initialLikesCount={post.likesCount} />
            <AppTypography sx={{ fontWeight: 700, fontSize: "14px" }}>
              {new Date(post.createdAt).toLocaleDateString()}
            </AppTypography>
          </Box>

          <Divider />
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
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: "14px" },
              }}
            />
            <Button
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
  );
};

export default PostModal;
