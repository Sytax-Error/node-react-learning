import { env } from "../config/env.js";

export const errorMiddleware = (error, req, res, next) => {
  let statusCode =
    error.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);

  let message = error.message || "Internal Server Error";

  if (error.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((err) => err.message)
      .join(", ");
  }

  if (error.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  if (error.code === "LIMIT_FILE_SIZE") {
    statusCode = 400;
    message = "File size must be less than 2 MB";
  }

  const errorLog = {
    time: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    statusCode,
    name: error.name,
    code: error.code,
    message: error.message,
  };

  if (env.nodeEnv === "development") {
    console.error("ERROR LOG:", errorLog);
    console.error(error.stack);
  }

  const responseMessage =
    env.nodeEnv === "production" && statusCode === 500
      ? "Internal Server Error"
      : message;

  res.status(statusCode).json({
    success: false,
    message,
  });
};
