import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getConversation } from "../controllers/messageController.js";

const router = express.Router();

// Получить переписку с пользователем

router.get("/:userId", authMiddleware, getConversation);
export default router;
