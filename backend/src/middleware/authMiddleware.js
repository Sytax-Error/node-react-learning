import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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
  const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

  res.status(200).json({
    message: "Token verified successfully",
    decoded,
  });
});
