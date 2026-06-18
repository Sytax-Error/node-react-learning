import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";

function TaskList({ tasks, onEditTask, onDeleteTask, loading }) {
  if (loading) {
    return (
      <Card className="task-card task-list-card">
        <div className="task-list-header">
          <div>
            <h3>My Tasks</h3>
            <p className="task-card-subtitle">Fetching your latest tasks...</p>
          </div>
        </div>

        <Skeleton variant="task-list" count={3} />
      </Card>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card className="task-card task-list-card">
        <h3>My Tasks</h3>
        <p className="task-card-subtitle">
          Your created tasks will appear here.
        </p>
        <EmptyState
          title="No tasks yet"
          description="Create your first task using the form on the left."
        />
      </Card>
    );
  }

  return (
    <Card className="task-card task-list-card">
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
    </Card>
  );
}

export default TaskList;
