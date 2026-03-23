import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./src/models/userModel.js";
import Post from "./src/models/postModel.js";
import connectDB from "./src/config/db.js";
