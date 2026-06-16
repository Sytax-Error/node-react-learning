import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  // creates a JWT token.
  return jwt.sign(
    // Payload This is the data stored inside token.
    {
      id: user._id,
      role: user.role,
    },
    // Secret
    process.env.JWT_ACCESS_SECRET,
    {
      //Options Token expiry time.
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    },
  );
};
