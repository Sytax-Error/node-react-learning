import cloudinary from "../config/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/sendResponse.js";
import fs from "fs";

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

export const uploadSingleFileToCloudinary = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("File is required");
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "node-react-learning",
  });

  fs.unlinkSync(req.file.path);

  sendResponse(res, 200, "file uploaded to Cloudinary successfully", {
    fileName: req.file.filename,
    fileUrl: result.secure_url,
    publicId: result.public_id,
  });
});
