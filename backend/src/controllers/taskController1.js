import { asyncHandler } from "../utils/asyncHandler.js";

let tasks = [];

export const getTasks = asyncHandler(async (req, res) => {
  res.status(200).json(tasks);
});

export const createTasks = asyncHandler(async (req, res) => {
  const { title, status } = req.body;

  if (!title?.trim() || !status?.trim()) {
    return res.status(400).json({
      message: "title and status required.",
    });
  }

  const cleanTitle = title;
  const cleanStatus = status;

  const newTask = {
    id: Date.now(),
    title: cleanTitle,
    status: cleanStatus,
  };

  tasks.push(newTask);

  res.status(201).json({
    message: "Task created successfully.",
    tasks: tasks,
  });
});

export const getByTaskId = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((item) => item.id === id);

  if (!task) {
    res.status(404).json({
      message: "Task not found.",
    });
  }

  res.status(200).json({
    message: "Taks found successfully.",
    task: task,
  });
});

export const updateTask = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const { title, status } = req.body;
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found.",
    });
  }

  if (!title?.trim() || !status?.trim()) {
    res.status(400).json({
      message: "title and status required.",
    });
  }

  task.title = title.trim();
  task.status = status.trim();

  res.status(200).json({
    message: "Task updated successfully.",
    task: task,
  });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((item) => item.id === id);

  if (!task) {
    res.status(404).json({
      message: "Task not found",
    });
  }

  const deletedTask = tasks.filter((item) => item.id !== id);

  res.status(200).json({
    message: "Task is deleted successfully.",
    deletedTask: task,
  });
});
