import './Input.css';

const Input = ({ label, placeholder, id, name, type, required, value, onChange, onBlur, children }) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={!type ? 'text' : type}
        id={id}
        placeholder={placeholder}
        required={required}
        name={name}
        value={value}
        className="form-control"
        min={0}
        onChange={onChange}
        onBlur={onBlur}
        formNoValidate
      />
      {children}
    </div>
  );
};

export default Input;
