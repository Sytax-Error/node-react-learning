import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many login attempts, please try again after 15 minutes",
  },
});

export const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: "Too many password reset requests, please try again later",
  },
});

export const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many OTP attempts, please try again after 5 minutes",
  },
});
