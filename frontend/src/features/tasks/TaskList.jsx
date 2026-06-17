function TaskList({ tasks, onEditTask, onDeleteTask, loading }) {
  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <div>
      <h3>My Tasks</h3>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong> - {task.status}
            <button type="button" onClick={() => onEditTask(task)}>
              Edit
            </button>
            <button type="button" onClick={() => onDeleteTask(task._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
