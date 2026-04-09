import { WarningCircle } from "@phosphor-icons/react";

function Input({
  label,
  error,
  icon,
  className = "",
  wrapperClassName = "",
  ...props
}) {
  return (
    <div className={wrapperClassName}>
      {label && <label className="form-label">{label}</label>}
      <div className="relative">
        <input
          className={`form-input ${icon ? "pr-11" : ""} ${
            error ? "!border-danger-500 !shadow-[0_0_0_4px_rgba(194,65,12,0.08)]" : ""
          } ${className}`}
          {...props}
        />
        {icon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-1.5 mt-2 text-sm text-danger-600">
          <WarningCircle size={14} weight="fill" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default Input;
