import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/userModel.js";
import {
  findAllUsers,
  createNewUser,
  findUserById,
  updateUserById,
  deleteUserById,
  findUserByEmail,
} from "../services/userService.js";
import { validateObjectId } from "../utils/validators.js";
import bcrypt from "bcryptjs";
import { sendResponse } from "../utils/sendResponse.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// let users = [];

export const getUsers = asyncHandler(async (req, res) => {
  const users = await findAllUsers();
  sendResponse(res, 200, "Users fetched successfully", users);
});

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    res.status(409);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createNewUser({
    name: name.trim(),
    email: email.trim(),
    password: hashedPassword,
    role: role.trim(),
  });

  const userResponse = user.toObject();
  delete userResponse.password;

  sendResponse(res, 200, "User created successfully", userResponse);
});

export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateObjectId(id, "user");

  const user = await findUserById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  sendResponse(res, 200, "User fetched successfully", user);
});

export const updateUser = asyncHandler(async (req, res) => {
  // const id = Number(req.params.id);
  // const user = users.find((user) => user.id === id);
  const { name, role } = req.body;
  const { id } = req.params;

  validateObjectId(id, "user");

  const user = await updateUserById(id, {
    name,
    role,
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }

  sendResponse(res, 200, "User updated successfully", user);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateObjectId(id, "user");

  const user = await deleteUserById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  sendResponse(res, 200, "User deleted successfully");
});

export const updateProfileImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Profile image is required");
  }

  // access the local upload folder to use image file
  // const fileUrl = `${req.protocol}://${req.get("host")}/${req.file.filename}`;

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "node-react-learning",
  });

  fs.unlinkSync(req.file.path);

  const updatedUser = await updateUserById(req.user._id, {
    profileImage: result.secure_url, // upload image of cloudinary
  });

  sendResponse(res, 200, "Profile image updated successfully", {
    user: updatedUser,
  });
});
