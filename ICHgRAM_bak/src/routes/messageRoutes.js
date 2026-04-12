import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getConversation } from "../controllers/messegeController.js";

const router = express.Router();

// Получить переписку с пользователем

router.get("/:userId", authMiddleware, getConversation);
export default router;

router.get("/chats", authMiddleware, getChats);
