import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  getUserProfile,
  updateProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);

// Update user profile
router.put("/profile", authMiddleware, upload.single("avatar"), updateProfile);
export default router;
