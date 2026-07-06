import express from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import taskRoutes from "./taskRoutes.js";
import uploadRoutes from "./uploadRoutes.js";
import emailRoutes from "./emailRoutes.js";
import smsRoutes from "./smsRoutes.js";
import healthRoutes from "./healthRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/uploads", uploadRoutes);
router.use("/emails", emailRoutes);
router.use("/sms", smsRoutes);
router.use("/health", healthRoutes);

export default router;
