import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import jwt from "jsonwebtoken";
import {
  findUserByEmail,
  findUserByEmailWithPassword,
  createAuthUser,
  findUserById,
} from "../services/authService.js";
import { sendResponse } from "../utils/sendResponse.js";
import { sendEmail } from "../utils/emailService.js";
import crypto from "crypto";
import {
  findUserByMobile,
  findUserByResetToken,
  updateUserById,
} from "../services/userService.js";
import { sendSms } from "../utils/smsService.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    res.status(409);
    throw new Error("User already exists with this email");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createAuthUser({
    name,
    email,
    password: hashedPassword,
  });

  sendResponse(res, 201, "User registered successfully", {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  await sendEmail({
    to: user.email,
    subject: "Welcome to Node Learning App",
    text: `Hello ${user.name}, welcome to Node Learning App.`,
    html: `
    <h2>Welcome ${user.name}</h2>
    <p>Your account has been created successfully.</p>
    <p>Thank you for joining Node Learning App.</p>
  `,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmailWithPassword(email);

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // Frontend JavaScript cannot read this cookie directly.
    secure: false, // For local development, HTTP is allowed.
    sameSite: "strict", // Cookie is restricted to same-site requests.
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiry is 7 days in milliseconds.
  });

  sendResponse(res, 200, "Login successful", {
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  sendResponse(res, 200, "Profile fetched successfully", req.user);
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.status(401);
    throw new Error("Refresh token missing");
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  const user = await findUserById(decoded.id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid refresh token");
  }

  const accessToken = generateAccessToken(user);

  sendResponse(res, 200, "Access token refreshed successfully", {
    accessToken,
  });
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("refreshToken", {
    // clears the refresh token cookie from client.
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  sendResponse(res, 200, "Logout successful");
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email || !email.trim()) {
    res.status(400);
    throw new Error("User email required");
  }

  const user = await findUserByEmail(email?.trim());

  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const resetTokenExpires = Date.now() + 10 * 60 * 1000;

  await updateUserById(user._id, {
    passwordResetToken: hashedToken,
    passwordResetExpires: resetTokenExpires,
  });

  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
  console.log("Sending password reset email...", resetUrl);

  await sendEmail({
    to: user.email,
    subject: "Password Reset Request",
    text: `Reset your password using this link: ${resetUrl}`,
    html: `
    <h2>Password Reset Request</h2>
    <p>Click the link below to reset your password:</p>
    <a href="${resetUrl}">${resetUrl}</a>
    <p>This link will expire in 10 minutes.</p>
  `,
  });
  console.log("Password reset email sent.");
  sendResponse(res, 200, "Password reset link sent successfully");
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    res.status(400);
    throw new Error("Passwrod required");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password length must be have atleast 6 characters");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await findUserByResetToken(hashedToken);

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired reset token");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  sendResponse(res, 200, "Password reset successfully");
});

export const forgotPasswordOtp = asyncHandler(async (req, res) => {
  const { mobile } = req.body || {};

  if (!mobile || !mobile.trim()) {
    res.status(400);
    throw new Error("mobile number required");
  }

  const user = await findUserByMobile(mobile.trim());

  if (!user) {
    res.status(404);
    throw new Error("User not found with this number");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  const otpExpires = Date.now() + 5 * 60 * 1000;

  await updateUserById(user._id, {
    passwordResetOtp: hashedOtp,
    passwordResetOtpExpires: otpExpires,
    isPasswordResetOtpVerified: false,
  });

  await sendSms({
    to: user.mobile,
    message: `Your password reset otp is ${otp}. It is valid for 5 minutes`,
  });

  sendResponse(res, 200, "Forgot password with otp api is working", {
    mobile: user.mobile,
  });
});

export const verifyResetOtp = asyncHandler(async (req, res) => {
  const { mobile, otp } = req.body || {};

  if (!mobile || !mobile.trim()) {
    res.status(400);
    throw new Error("Mobile number is required");
  }

  if (!otp || !otp.trim()) {
    res.status(400);
    throw new Error("Otp is required");
  }

  const user = await findUserByMobile(mobile.trim());

  if (!user) {
    res.status(404);
    throw new Error("User not found with this mobile number");
  }

  const hashedOtp = crypto
    .createHash("sha256")
    .update(otp.trim())
    .digest("hex");

  if (
    hashedOtp !== user.passwordResetOtp ||
    user.passwordResetOtpExpires < Date.now()
  ) {
    res.status(400);
    throw new Error("Invalid or Expired otp");
  }

  await updateUserById(user._id, {
    isPasswordResetOtpVerified: true,
  });

  sendResponse(res, 200, "Otp verified successfully", {
    mobile: user.mobile,
  });
});

export const resetPasswordWithOtp = asyncHandler(async (req, res) => {
  const { mobile, password } = req.body || {};

  if (!mobile || !mobile.trim()) {
    res.status(400);
    throw new Error("Mobile number is required");
  }

  if (!password || !password.trim()) {
    res.status(400);
    throw new Error("Password is required");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password length must be atleast 6 character");
  }

  const user = await findUserByMobile(mobile.trim());

  if (!user) {
    res.status(404);
    throw new Error("User not found with this number");
  }

  if (!user.isPasswordResetOtpVerified) {
    res.status(400);
    throw new Error("Otp verification is required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword, user);
  user.password = hashedPassword;
  user.passwordResetOtp = undefined;
  user.passwordResetOtpExpires = undefined;
  user.isPasswordResetOtpVerified = false;

  await user.save();

  sendResponse(res, 200, "Password reset successfully with otp");
});
