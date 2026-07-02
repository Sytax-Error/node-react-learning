import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateAccessToken = (user) => {
  // creates a JWT token.
  return jwt.sign(
    // Payload This is the data stored inside token.
    {
      id: user._id,
      role: user.role,
    },
    // Secret
    env.jwt.accessSecret,
    {
      //Options Token expiry time.
      expiresIn: env.jwt.accessExpiresIn,
    },
  );
};

// Refresh token is only used to generate a new access token.
export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    env.jwt.refreshSecret,
    {
      expiresIn: env.jwt.refreshExpiresIn,
    },
  );
};
