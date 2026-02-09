import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  getUserProfile,
  updateProfile,
} from "../controllers/userController.js";
