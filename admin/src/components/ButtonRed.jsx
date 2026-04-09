function ButtonRed({ children, event, onClick, className = "", disabled, type = "button" }) {
  const handleClick = event || onClick;

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`btn btn-danger ${className}`}
    >
      {children}
    </button>
  );
}

export default ButtonRed;
