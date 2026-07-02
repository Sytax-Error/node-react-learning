import express from "express";
import {
  forgotPassword,
  forgotPasswordOtp,
  getProfile,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resetPassword,
  resetPasswordWithOtp,
  verifyResetOtp,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  validateLoginBody,
  validateRegisterBody,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/register", validateRegisterBody, registerUser);
router.post("/login", validateLoginBody, loginUser);
router.get("/profile", protect, getProfile);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/forgot-password-otp", forgotPasswordOtp);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password-otp", resetPasswordWithOtp);

export default router;
