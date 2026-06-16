import { asyncHandler } from "../utils/asyncHandler.js";
import { Task } from "../models/taskModel.js";
import { validateObjectId } from "../utils/validators.js";

export const getTasks = asyncHandler(async (req, res) => {
  const task = await Task.find({ user: req.user._id }); //Get only tasks where user id matches logged-in user id
  return res.status(200).json(task);
});

export const createTasks = asyncHandler(async (req, res) => {
  const { title, status } = req.body;

  if (!title?.trim() || !status?.trim()) {
    return res.status(400).json({
      message: "Title and Status required.",
    });
  }

  const task = await Task.create({
    title,
    status,
    user: req.user._id, // current logged-in user's MongoDB id
  });

  res.status(201).json({
    message: "Task created.",
  });
});

export const getByTaskId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;

  validateObjectId(id, "task");

  if (!title?.trim() || !status?.trim()) {
    return res.status(400).json({
      message: "Title and Status required.",
    });
  }

  const task = await Task.findOne({
    _id: id, // task id from URL
    user: req.user._id, // logged-in user id
  });

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

  if (!title?.trim() || !status?.trim()) {
    return res.status(400).json({
      message: "Title and Status is required.",
    });
  }

  const task = await Task.findByIdAndUpdate(
    {
      _id: id,
      user: req.user._id,
    },
    {
      title,
      status,
    },
    {
      returnDocument: true,
      runvalidators: true,
    },
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

  const task = await Task.findOneAndDelete({
    _id: id,
    user: req.user._id,
  });

  if (!task) {
    return res.status(400).json({
      message: "Task not found",
    });
  }

  res.status(200).json({
    message: "Task deleted.",
  });
});
