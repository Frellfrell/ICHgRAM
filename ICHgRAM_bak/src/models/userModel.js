import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    fullName: {
      type: String,
      required: true,
      unique: false,
    },
    bio: {
      type: String,
      default: "",
      maxlength: 200,
    },
    avatar: {
      type: String, // base64
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    website: {
      type: String,
      default: "",
    },
    // массивы для связи, чтобы быстро считать подписчиков
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.pre("save", function () {
  if (this.isModified("email")) {
    this.email = this.email.toLowerCase().trim();
  }
});

export default mongoose.model("User", userSchema);
