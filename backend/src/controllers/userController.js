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

// let users = [];

export const getUsers = asyncHandler(async (req, res) => {
  const users = await findAllUsers();
  res.status(200).json(users);
});

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !name.trim()) {
    res.status(400);
    throw new Error("Name is required");
  }

  if (!email || !email.trim()) {
    res.status(400);
    throw new Error("Email is required");
  }

  if (!password || !password.trim()) {
    res.status(400);
    throw new Error("Password is required");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }

  if (!role || !role.trim()) {
    res.status(400);
    throw new Error("Role is required");
  }

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

  res.status(201).json({
    message: "User created successfully",
    user: userResponse,
  });
});
export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateObjectId(id, "user");

  const user = await findUserById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
  // const id = Number(req.params.id);
  // const user = users.find((user) => user.id === id);
  const { name, role } = req.body;
  const { id } = req.params;

  validateObjectId(id, "user");

  if (!name || !role || !name.trim() || !role.trim()) {
    res.status(400);
    throw new Error("Name and role are required");
  }

  const user = await updateUserById(id, {
    name,
    role,
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }

  res.json({
    message: "user updated successfully.",
    user,
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateObjectId(id, "user");

  const user = await deleteUserById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    message: "User deleted successfully",
  });
});
