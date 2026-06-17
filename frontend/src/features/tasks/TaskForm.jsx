import { useEffect, useState } from "react";

function TaskForm({
  onCreateTask,
  onUpdateTask,
  editingTask,
  onCancelEdit,
  loading,
}) {
  const [formData, setFormData] = useState({
    title: "",
    status: "pending",
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        status: editingTask.status,
      });
    } else {
      setFormData({
        title: "",
        status: "pending",
      });
    }
  }, [editingTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editingTask) {
      await onUpdateTask(editingTask._id, formData);
    } else {
      await onCreateTask(formData);
    }

    setFormData({
      title: "",
      status: "pending",
    });
  };

  return (
    <div>
      <h3>{editingTask ? "Update Task" : "Create Task"}</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading
            ? editingTask
              ? "Updating..."
              : "Creating..."
            : editingTask
              ? "Update Task"
              : "Create Task"}
        </button>

        {editingTask && (
          <button type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default TaskForm;
