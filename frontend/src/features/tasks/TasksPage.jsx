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
      setTasks(data.data.tasks || []);
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

      setTasks((prevTasks) => [...prevTasks, newTask.data]);
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
          String(task._id) === String(taskId) ? updatedTask.data : task,
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
    <main className="tasks-page">
      <section className="tasks-header">
        <div>
          <p className="section-label">Task Management</p>
          <h1>My Tasks</h1>
          <p className="section-description">
            Create, update, and manage your personal tasks securely.
          </p>
        </div>
      </section>

      {error && <p className="tasks-error">{error}</p>}

      <section className="tasks-grid">
        <TaskForm
          onCreateTask={handleCreateTask}
          onUpdateTask={handleUpdateTask}
          editingTask={editingTask}
          onCancelEdit={handleCancelEdit}
          loading={creating}
        />

        <TaskList
          tasks={tasks}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          loading={loading}
        />
      </section>
    </main>
  );
}

export default TasksPage;
