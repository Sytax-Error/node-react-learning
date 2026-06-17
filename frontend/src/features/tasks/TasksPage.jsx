import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { createTask, deleteTask, getTasks, updateTask } from "./taskService";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    setCreating(true);
    setError("");

    try {
      const newTask = await createTask(taskData);

      setTasks((prevTasks) => [...prevTasks, newTask.task]);
    } catch (error) {
      setError(error.message);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    setError("");

    try {
      await deleteTask(taskId);

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    setCreating(true);
    setError("");

    try {
      const updatedTask = await updateTask(taskId, taskData);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          String(task._id) === String(taskId) ? updatedTask.task : task,
        ),
      );
      setEditingTask(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setCreating(false);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  useEffect(() => {
    // defer fetch to avoid synchronous setState within effect which can
    // trigger cascading renders
    const id = setTimeout(() => {
      fetchTasks();
    }, 0);

    return () => clearTimeout(id);
  }, []);

  return (
    <div>
      <h2>Tasks</h2>

      {error && <p>{error}</p>}

      <TaskForm
        onCreateTask={handleCreateTask}
        onUpdateTask={handleUpdateTask}
        editingTask={editingTask}
        onCancelEdit={handleCancelEdit}
        loading={creating}
      />

      <hr />

      <TaskList
        tasks={tasks}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        loading={loading}
      />
    </div>
  );
}

export default TasksPage;
