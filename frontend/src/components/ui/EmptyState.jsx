function EmptyState({
  title = "No data found",
  description = "There is nothing to show right now.",
}) {
  return (
    <div className="ui-empty-state">
      <div className="ui-empty-icon">📋</div>

      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
}

export default EmptyState;
