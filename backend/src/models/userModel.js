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
      select: false, // Do not return password field by default in queries.
    },
    mobile: {
      type: String,
      trime: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      default: "user",
    },
    profileImage: {
      type: String,
      default: "",
    },
    profileImagePublicId: {
      type: String,
      default: "",
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
    passwordResetOtp: {
      type: String,
    },
    passwordResetOtpExpires: {
      type: Date,
    },
    isPasswordResetOtpVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
// User model is created from userSchema.
// Create model
export const User = mongoose.model("User", userSchema);
