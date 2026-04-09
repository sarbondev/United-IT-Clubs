import { WarningCircle } from "@phosphor-icons/react";

function Select({
  label,
  error,
  options = [],
  className = "",
  wrapperClassName = "",
  placeholder = "Tanlang...",
  ...props
}) {
  return (
    <div className={wrapperClassName}>
      {label && <label className="form-label">{label}</label>}
      <div className="relative">
        <select
          className={`form-select ${
            error ? "!border-danger-500 !shadow-[0_0_0_4px_rgba(194,65,12,0.08)]" : ""
          } ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option key={option.value || index} value={option.value}>
              {option.icon && `${option.icon} `}
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
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

export default Select;
