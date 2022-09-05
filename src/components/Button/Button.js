import './Button.css';

const Button = ({ type, text, px, py, bgcolor, color, disabled, onClick }) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    style={{
      padding: `${py}px ${px}px`,
      color: color,
      background: bgcolor,
      border: 'none',
      opacity: disabled ? 0.5 : 1,
    }}
  >
    {text}
  </button>
);

export default Button;
