import express from "express";
import {
  addComment,
  getPostComments,
  deleteComment,
} from "../controllers/commentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:postId", authMiddleware, addComment);
router.get("/:postId", getPostComments);
router.delete("/:postId/:commentId", authMiddleware, deleteComment);

export default router;
