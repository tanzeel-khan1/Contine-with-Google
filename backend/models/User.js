import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      sparse: true, 
    },

    password: {
      type: String,
      required: false,
      select: false,
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    avatar: {
      type: String,
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    // 🔥 ROLE FIELD
    role: {
      type: String,
      enum: ["admin", "student", "teacher", "user"],
      default: "user", 
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
