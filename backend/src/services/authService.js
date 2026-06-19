import { User } from "../models/userModel.js";

export const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

export const findUserByEmailWithPassword = async (email) => {
  return User.findOne({ email }).select("+password");
};

export const createAuthUser = async (userData) => {
  return User.create(userData);
};

export const findUserById = async (userId) => {
  return User.findById(userId);
};
