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
