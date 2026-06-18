function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
}) {
  return (
    <div className="ui-field">
      {label && <label htmlFor={name}>{label}</label>}

      <input
        id={name}
        className="ui-input"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export default Input;
