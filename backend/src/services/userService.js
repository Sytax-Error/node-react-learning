import { User } from "../models/userModel.js";

export const findAllUsers = async () => {
  return User.find().select("-password");
};

export const createNewUser = async (userData) => {
  return User.create(userData);
};

export const findUserById = async (userId) => {
  return User.findById(userId).select("-password");
};

export const updateUserById = async (userId, userData) => {
  return User.findByIdAndUpdate(userId, userData, {
    returnDocument: "after",
    runValidators: true,
  }).select("-password");
};

export const deleteUserById = async (userId) => {
  return User.findByIdAndDelete(userId).select("-password");
};

export const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

export const findUserByResetToken = async (hashedToken) => {
  return User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  }).select("+password");
};
