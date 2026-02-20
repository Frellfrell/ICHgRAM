import express from "express";
import {
  addComment,
  getPostComments,
  deleteComment,
} from "../controllers/commentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

router.post("/:postId", authMiddleware, addComment);
router.get("/:postId", getPostComments);
