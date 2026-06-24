import { asyncHandler } from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/sendResponse.js";

export const uploadSingleFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("File is required");
  }
  const fileUrl = `${req.protocol}://${req.get("host")}/${req.file.path}`;

  sendResponse(res, 200, "File uploaded successfully", {
    fileName: req.file.filename,
    fileUrl,
  });
});
