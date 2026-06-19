import express from "express";
import {
  getTasks,
  createTasks,
  getByTaskId,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  validateTaskBody,
  validateTaskQuery,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/", protect, validateTaskQuery, getTasks);

router.post("/", protect, validateTaskBody, createTasks);

router.get("/:id", protect, getByTaskId);

router.put("/:id", protect, validateTaskBody, updateTask);

router.delete("/:id", protect, deleteTask);

export default router;
