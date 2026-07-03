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

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Returns all tasks.
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 */
router.get("/", protect, validateTaskQuery, getTasks);

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create new task
 *     description: Creates a new task.
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn Swagger
 *               description:
 *                 type: string
 *                 example: Add API documentation for task routes
 *               status:
 *                 type: string
 *                 example: pending
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", protect, validateTaskBody, createTasks);

router.get("/:id", protect, getByTaskId);

router.put("/:id", protect, validateTaskBody, updateTask);

router.delete("/:id", protect, deleteTask);

export default router;
