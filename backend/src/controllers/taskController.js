import { asyncHandler } from "../utils/asyncHandler.js";
import { Task } from "../models/taskModel.js";
import { validateObjectId } from "../utils/validators.js";
import {
  createTaskForUser,
  deleteTaskByIdAndUser,
  findTasksByUser,
  updateTaskByIdAndUser,
} from "../services/taskService.js";
import { sendResponse } from "../utils/sendResponse.js";

export const getTasks = asyncHandler(async (req, res) => {
  const result = await findTasksByUser(req.user._id, {
    status: req.query.status,
    search: req.query.search,
    sort: req.query.sort,
    page: req.query.page,
    limit: req.query.limit,
  }); //Get only tasks where user id matches logged-in user id
  sendResponse(res, 200, "Tasks fetched successfully", result);
});

export const createTasks = asyncHandler(async (req, res) => {
  const { title, status } = req.body;

  const task = await createTaskForUser(
    req.body,
    req.user._id, // current logged-in user's MongoDB id
  );

  sendResponse(res, 201, "Task created successfully", task);
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

  sendResponse(res, 200, "Task fetched successfully", task);
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

  sendResponse(res, 200, "Task updated successfully", task);
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

  sendResponse(res, 200, "Task deleted successfully");
});
