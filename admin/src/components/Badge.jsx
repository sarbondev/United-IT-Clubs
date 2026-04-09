function Badge({ children, variant = "neutral", className = "" }) {
  const variants = {
    primary: "badge badge-primary",
    success: "badge badge-success",
    warning: "badge badge-warning",
    danger: "badge badge-danger",
    neutral: "badge badge-neutral",
  };

  return (
    <span className={`${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

export default Badge;
