import { asyncHandler } from "../utils/asyncHandler.js";
import { Task } from "../models/taskModel.js";
import mongoose from "mongoose";

export const getTasks = asyncHandler(async (req, res) => {
  const task = await Task.find();
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
  });

  res.status(201).json({
    message: "Task created.",
  });
});

export const getByTaskId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;

  const isValidId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidId) {
    return res.status(400).json({
      message: "Invalid task id.",
    });
  }

  if (!title?.trim() || !status?.trim()) {
    return res.status(400).json({
      message: "Title and Status required.",
    });
  }

  const task = await Task.findById(id);

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

  const isValidId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidId) {
    return res.status(400).json({
      message: "Invalid task id.",
    });
  }

  if (!title?.trim() || !status?.trim()) {
    return res.status(400).json({
      message: "Title and Status is required.",
    });
  }

  const task = await Task.findByIdAndUpdate(
    id,
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

  const isValidId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidId) {
    return res.status(400).json({
      message: "Invalid task id.",
    });
  }

  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    return res.status(400).json({
      message: "Task not found",
    });
  }

  res.status(200).json({
    message: "Task deleted.",
  });
});
