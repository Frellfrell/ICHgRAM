import express from "express";
import {
  createPost,
  getAllPosts,
  getUserPost,
  getPostById,
  updatePost,
  deletePost,
  getExplorePosts,
} from "../controllers/postController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), createPost);
router.get("/", getAllPosts);
// Explore — случайные посты
router.get("/explore", authMiddleware, getExplorePosts);
router.get("/user/:userId", getUserPost);
router.get("/:postId", getPostById);
router.delete("/:postId", authMiddleware, deletePost);
router.put("/:postId", authMiddleware, upload.single("image"), updatePost);

export default router;
