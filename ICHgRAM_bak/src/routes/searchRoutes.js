import express from "express";
import { searchController } from "../controllers/searchController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Маршрут для поиска пользователей
router.get("/", authMiddleware, searchController);

export default router;
