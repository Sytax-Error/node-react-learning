function Skeleton({ variant = "line", count = 1 }) {
  if (variant === "card") {
    return (
      <div className="ui-skeleton-card">
        <div className="ui-skeleton ui-skeleton-title"></div>
        <div className="ui-skeleton ui-skeleton-line"></div>
        <div className="ui-skeleton ui-skeleton-line short"></div>
      </div>
    );
  }

  if (variant === "task-list") {
    return (
      <div className="ui-skeleton-list">
        {Array.from({ length: count }).map((_, index) => (
          <div className="ui-skeleton-task" key={index}>
            <div>
              <div className="ui-skeleton ui-skeleton-title"></div>
              <div className="ui-skeleton ui-skeleton-badge"></div>
            </div>

            <div className="ui-skeleton-actions">
              <div className="ui-skeleton ui-skeleton-button"></div>
              <div className="ui-skeleton ui-skeleton-button"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {Array.from({ length: count }).map((_, index) => (
        <div className="ui-skeleton ui-skeleton-line" key={index}></div>
      ))}
    </div>
  );
}

export default Skeleton;
