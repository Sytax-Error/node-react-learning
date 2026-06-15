import mongoose from "mongoose";
// Every user document should follow this shape.
// Schema
const userSchema = new mongoose.Schema(
  {
    // Field: name
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);
// User model is created from userSchema.
// Create model
export const User = mongoose.model("User", userSchema);
