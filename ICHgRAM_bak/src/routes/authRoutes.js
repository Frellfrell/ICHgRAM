import express from "express";
import {
  register,
  login,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// Register route
router.post("/register", register);
// Login route
router.post("/login", login);
// Reset password route
router.post("/reset-password", resetPassword);

export default router;
