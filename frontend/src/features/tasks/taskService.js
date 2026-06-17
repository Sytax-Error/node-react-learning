import { API_BASE_URL } from "../../config/api";
import { authFetch } from "../../utils/authFetch";

export const getTasks = async () => {
  return authFetch(`${API_BASE_URL}/tasks`);
};

export const createTask = async (taskData) => {
  return authFetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    body: JSON.stringify(taskData),
  });
};

export const deleteTask = async (taskId) => {
  return authFetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "DELETE",
  });
};

export const updateTask = async (taskId, taskData) => {
  return authFetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(taskData),
  });
};
