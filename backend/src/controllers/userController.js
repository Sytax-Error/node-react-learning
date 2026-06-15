import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/userModel.js";
import { validateObjectId } from "../utils/validators.js";

// let users = [];

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

export const createUser = asyncHandler(async (req, res) => {
  const { name, role } = req.body;

  if (!name || !role || !name.trim() || !role.trim()) {
    return res.status(400).json({
      message: "Name and role are required",
    });
  }

  const user = await User.create({
    name,
    role,
  });

  res.status(201).json({
    message: "User created successfully",
    user,
  });
});

export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateObjectId(id, "user");

  const user = await User.findById(id);

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

  const user = await User.findByIdAndUpdate(
    id,
    {
      name,
      role,
    },
    {
      returnDocument: "after", // After updating, return the updated user document.
      runValidators: true, // Run schema validation during update
    },
  );

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

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    message: "User deleted successfully",
  });
});
