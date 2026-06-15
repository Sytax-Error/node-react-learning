import express from "express";
import {
  getTasks,
  createTasks,
  getByTaskId,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTasks);

router.post("/", createTasks);

router.get("/:id", getByTaskId);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
