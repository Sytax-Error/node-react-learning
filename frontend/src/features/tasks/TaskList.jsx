import Button from "../../components/ui/Button";

function TaskList({ tasks, onEditTask, onDeleteTask, loading }) {
  if (loading) {
    return (
      <div className="task-card task-list-card">
        <p className="tasks-loading">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-card task-list-card">
        <h3>My Tasks</h3>
        <p className="task-card-subtitle">
          Your created tasks will appear here.
        </p>
        <p className="tasks-empty">No tasks found.</p>
      </div>
    );
  }

  return (
    <div className="task-card task-list-card">
      <div className="task-list-header">
        <div>
          <h3>My Tasks</h3>
          <p className="task-card-subtitle">
            You have {tasks.length} task{tasks.length > 1 ? "s" : ""}.
          </p>
        </div>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-item" key={task._id}>
            <div className="task-content">
              <h4>{task.title}</h4>
              <span className={`task-status ${task.status}`}>
                {task.status}
              </span>
            </div>

            <div className="task-item-actions">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onEditTask(task)}
              >
                Edit
              </Button>

              <Button
                size="sm"
                variant="danger"
                onClick={() => onDeleteTask(task._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
