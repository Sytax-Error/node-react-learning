import { Task } from "../models/taskModel.js";

export const findTasksByUser = async (userId, queryOptions = {}) => {
  const { status } = queryOptions;

  const page = Number(queryOptions.page) || 1;
  const limit = Number(queryOptions.limit) || 10;

  const filter = {
    user: userId,
  };

  // STATUS FILTER
  if (status) {
    filter.status = status;
  }

  // SEARCH FILTER
  if (queryOptions.search) {
    filter.title = {
      $regex: queryOptions.search,
      $options: "i",
    };
  }

  const skip = (page - 1) * limit;

  let sortOrder = -1;

  if (queryOptions.sort === "asc") {
    sortOrder = 1;
  }

  const tasks = await Task.find(filter)
    // .sort({ createdAt: sortOrder }) // based on creation time latest first or oldest
    .sort({ title: sortOrder }) // Alphabetical sorting
    .skip(skip)
    .limit(limit);

  const totalTasks = await Task.countDocuments(filter);

  return {
    tasks,
    pagination: {
      totalTasks,
      currentPage: page,
      totalPages: Math.ceil(totalTasks / limit),
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
