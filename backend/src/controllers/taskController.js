import { asyncHandler } from "../utils/asyncHandler.js";
import { Task } from "../models/taskModel.js";
import { validateObjectId } from "../utils/validators.js";
import {
  createTaskForUser,
  deleteTaskByIdAndUser,
  findTasksByUser,
  updateTaskByIdAndUser,
} from "../services/taskService.js";

export const getTasks = asyncHandler(async (req, res) => {
  const task = await findTasksByUser(req.user._id); //Get only tasks where user id matches logged-in user id
  return res.status(200).json(task);
});

export const createTasks = asyncHandler(async (req, res) => {
  const { title, status } = req.body;

  const task = await createTaskForUser(
    req.body,
    req.user._id, // current logged-in user's MongoDB id
  );

  res.status(201).json({
    message: "Task created.",
    task,
  });
});

export const getByTaskId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;

  validateObjectId(id, "task");

  const task = await findTaskByIdAndUser(req.params.id, req.user._id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found.",
    });
  }

  res.status(200).json({
    message: "Task found",
    task,
  });
});

export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;

  validateObjectId(id, "task");

  const task = await updateTaskByIdAndUser(
    req.params.id,
    req.user._id,
    req.body,
  );

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.status(200).json({
    message: "Task updated successfully.",
    task,
  });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateObjectId(id, "task");

  const task = await deleteTaskByIdAndUser(req.params.id, req.user._id);

  if (!task) {
    return res.status(400).json({
      message: "Task not found",
    });
  }

  res.status(200).json({
    message: "Task deleted.",
  });
});
