import express from "express";
import { toggleLike, getPostLikes } from "../controllers/likeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:postId", authMiddleware, toggleLike);
