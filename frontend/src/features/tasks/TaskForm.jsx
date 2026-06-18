import { useEffect, useState } from "react";
import Button from "../../components/layout/Button";

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
    <div className="task-card task-form-card">
      <h3>{editingTask ? "Update Task" : "Create Task"}</h3>
      <p className="task-card-subtitle">
        {editingTask
          ? "Update your selected task details."
          : "Add a new task to your personal list."}
      </p>

      <form onSubmit={handleSubmit} className="task-form">
        <div className="task-form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
          />
        </div>

        <div className="task-form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="task-actions">
          <Button type="submit" fullWidth disabled={loading}>
            {loading
              ? editingTask
                ? "Updating..."
                : "Creating..."
              : editingTask
                ? "Update Task"
                : "Create Task"}
          </Button>

          {editingTask && (
            <Button type="button" variant="secondary" onClick={onCancelEdit}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
