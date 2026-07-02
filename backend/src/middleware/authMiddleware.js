import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { env } from "../config/env.js";

export const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization; // token with Bearer

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("Not authorized, token missing");
  }

  const token = authHeader.split(" ")[1]; // remove Bearer

  // Token is valid
  // Token is not expired
  // Token was created using our secret
  const decoded = jwt.verify(token, env.jwt.accessSecret);
  // Finds logged-in user from MongoDB.
  const user = await User.findById(decoded.id).select("-password");
  //.select("-password")       Return user data but exclude password

  if (!user) {
    res.status(404);
    throw new Error("Not authorized, user not found");
  }

  req.user = user; // Stores logged-in user data in request object.
  next(); // Sends request to next controller.
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // This line checks logged-in user role:
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("You are not allow to access this resource.");
    }
    next();
  };
};
