import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import {
  uploadSingleFile,
  uploadSingleFileToCloudinary,
} from "../controllers/uploadController.js";

const router = express.Router();

router.post("/single", upload.single("file"), uploadSingleFile);
router.post(
  "/cloudinary/single",
  upload.single("file"),
  uploadSingleFileToCloudinary,
);

export default router;
