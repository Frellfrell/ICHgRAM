import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import {
  getUserProfile,
  updateProfile,
} from "../controllers/userController.js";

const router = express.Router();

// Получить профиль пользователя по ID
router.get("/:userId", authMiddleware, getUserProfile);

// Обновить профиль пользователя
router.put("/", authMiddleware, upload.single("avatar"), updateUserProfile);

export default router;
