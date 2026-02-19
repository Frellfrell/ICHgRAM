import express from "express";
import { getNotifications } from "../controllers/notificationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Маршрут для получения уведомлений
router.get("/", authMiddleware, getNotifications);

export default router;
