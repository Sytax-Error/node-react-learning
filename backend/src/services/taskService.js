import { Task } from "../models/taskModel.js";

export const findTasksByUser = async (userId, queryOptions = {}) => {
  const { status } = queryOptions;

  const page = Number(queryOptions.page) || 1;
  const limit = Number(queryOptions.limit) || 10;

  const filter = {
    user: userId,
  };

  if (status) {
    filter.status = status;
  }

  const skip = (page - 1) * limit;

  const tasks = await Task.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalTasks = await Task.countDocuments(filter);

  const totalPages = Math.ceil(totalTasks / limit);

  return {
    tasks,
    pagination: {
      totalTasks,
      currentPage: page,
      totalPages,
      limit,
    },
  };
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
