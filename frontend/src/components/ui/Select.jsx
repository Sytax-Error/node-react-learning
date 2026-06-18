function Select({ label, name, value, onChange, options = [] }) {
  return (
    <div className="ui-field">
      {label && <label htmlFor={name}>{label}</label>}

      <select
        id={name}
        className="ui-input"
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
