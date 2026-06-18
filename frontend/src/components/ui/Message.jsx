function Message({ type = "error", children }) {
  if (!children) {
    return null;
  }

  return <p className={`ui-message ui-message-${type}`}>{children}</p>;
}

export default Message;
