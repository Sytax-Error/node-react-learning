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
    message = "File size must be less then 2 MB";
  }

  console.log("Error name: ", error?.name, error?.code);

  res.status(statusCode).json({
    success: false,
    message,
  });
};
