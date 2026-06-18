import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Card from "../../components/ui/Card";
import Message from "../../components/ui/Message";

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
  const [formError, setFormError] = useState("");

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
    setFormError("");

    if (!formData.title.trim()) {
      setFormError("Task title is required.");
      return;
    }

    if (!formData.status.trim()) {
      setFormError("Task status is required.");
      return;
    }

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
    <Card className="task-card task-form-card">
      <h3>{editingTask ? "Update Task" : "Create Task"}</h3>
      <p className="task-card-subtitle">
        {editingTask
          ? "Update your selected task details."
          : "Add a new task to your personal list."}
      </p>

      <form onSubmit={handleSubmit} className="task-form">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
        />

        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: "pending", label: "Pending" },
            { value: "completed", label: "Completed" },
          ]}
        />
        <Message type="error">{formError}</Message>
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
    </Card>
  );
}

export default TaskForm;
