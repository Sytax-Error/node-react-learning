import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import { uploadSingleFile } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/single", upload.single("file"), uploadSingleFile);

export default router;
