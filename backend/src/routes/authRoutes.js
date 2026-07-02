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
import {
  forgotPasswordLimiter,
  loginLimiter,
  otpLimiter,
} from "../middleware/rateLimiterMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     description: Login user using email and password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@test.com
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", loginLimiter, validateLoginBody, loginUser);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     description: Creates a new user account.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Test User
 *               email:
 *                 type: string
 *                 example: testuser@example.com
 *               password:
 *                 type: string
 *                 example: test123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: User already exists
 */
router.post("/register", validateRegisterBody, registerUser);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get logged-in user profile
 *     description: Returns the profile of the currently logged-in user.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *       401:
 *         description: Not authorized or token missing
 */
router.get("/profile", protect, getProfile);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logoutUser);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Send password reset link
 *     description: Sends a password reset link to the user's registered email.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@test.com
 *     responses:
 *       200:
 *         description: Password reset link sent successfully
 *       400:
 *         description: Email is required
 *       404:
 *         description: User not found
 */
router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password/{token}:
 *   post:
 *     summary: Reset password using email token
 *     description: Resets user password using the token received in email.
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token received in email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: newpass123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid or expired reset token
 */
router.post("/reset-password/:token", resetPassword);

/**
 * @swagger
 * /api/auth/forgot-password-otp:
 *   post:
 *     summary: Send password reset OTP
 *     description: Sends a password reset OTP to user's registered mobile number.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "+91737478XXXX"
 *     responses:
 *       200:
 *         description: Password reset OTP sent successfully
 *       400:
 *         description: Mobile number is required
 *       404:
 *         description: User not found with this mobile number
 */
router.post("/forgot-password-otp", forgotPasswordLimiter, forgotPasswordOtp);

/**
 * @swagger
 * /api/auth/verify-reset-otp:
 *   post:
 *     summary: Verify password reset OTP
 *     description: Verifies OTP sent to user's registered mobile number.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *               - otp
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "+91737478XXXX"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid or expired OTP
 *       404:
 *         description: User not found with this mobile number
 */
router.post("/verify-reset-otp", otpLimiter, verifyResetOtp);

/**
 * @swagger
 * /api/auth/reset-password-otp:
 *   post:
 *     summary: Reset password using OTP
 *     description: Resets user password after OTP verification.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *               - password
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "+91737478XXXX"
 *               password:
 *                 type: string
 *                 example: newpass123
 *     responses:
 *       200:
 *         description: Password reset successfully using OTP
 *       400:
 *         description: OTP verification required or validation error
 *       404:
 *         description: User not found with this mobile number
 */
router.post("/reset-password-otp", resetPasswordWithOtp);

export default router;
