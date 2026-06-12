export const errorMiddleware = (error, req, res, nex) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: error.message || "Internal Server Error",
  });
};
