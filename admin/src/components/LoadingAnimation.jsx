function LoadingAnimation({ children, size = "md" }) {
  const sizeClass = size === "sm" ? "scale-90" : size === "lg" ? "scale-125" : "";

  return (
    <div className="section-card flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className={`dot-loader mb-5 ${sizeClass}`}>
        <span />
        <span />
        <span />
      </div>
      {children && (
        <p className="text-sm font-medium text-slate-600">{children}</p>
      )}
    </div>
  );
}

export default LoadingAnimation;
