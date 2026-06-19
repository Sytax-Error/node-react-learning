import { Task } from "../models/taskModel.js";

export const findTasksByUser = async (userId) => {
  return Task.find({ user: userId });
};

export const createTaskForUser = async (taskData, userId) => {
  return Task.create({
    ...taskData,
    user: userId,
  });
};

export const findTaskByIdAndUser = async (taskId, userId) => {
  return Task.findOne({
    _id: taskId,
    user: userId,
  });
};

export const updateTaskByIdAndUser = async (taskId, userId, taskData) => {
  return Task.findOneAndUpdate(
    {
      _id: taskId,
      user: userId,
    },
    taskData,
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
};

export const deleteTaskByIdAndUser = async (taskId, userId) => {
  return Task.findOneAndDelete({
    _id: taskId,
    user: userId,
  });
};
