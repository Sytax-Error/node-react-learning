function Loading({ text = "Loading..." }) {
  return (
    <div className="ui-loading">
      <span className="ui-spinner"></span>
      <span>{text}</span>
    </div>
  );
}

export default Loading;
