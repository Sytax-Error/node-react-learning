export const errorMiddleware = (error, req, res, next) => {
  const statusCode =
    error.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  res.status(statusCode).json({
    message: error.message || "Internal Server Error",
  });
};
