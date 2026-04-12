import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getConversation } from "../controllers/messegeController.js";
import { getChats } from "../controllers/messageController.js";

const router = express.Router();

// Получить переписку с пользователем

router.get("/chats", authMiddleware, getChats);

router.get("/:userId", authMiddleware, getConversation);
export default router;
