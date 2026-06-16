import express from "express";
import {
  getTasks,
  createTasks,
  getByTaskId,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTasks);

router.post("/", protect, createTasks);

router.get("/:id", protect, getByTaskId);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

export default router;
