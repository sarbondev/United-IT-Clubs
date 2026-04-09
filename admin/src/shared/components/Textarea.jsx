import { WarningCircle } from "@phosphor-icons/react";

function Textarea({
  label,
  error,
  className = "",
  wrapperClassName = "",
  rows = 4,
  ...props
}) {
  return (
    <div className={wrapperClassName}>
      {label && <label className="form-label">{label}</label>}
      <textarea
        rows={rows}
        className={`form-textarea ${
          error ? "!border-danger-500 !shadow-[0_0_0_4px_rgba(194,65,12,0.08)]" : ""
        } ${className}`}
        {...props}
      />
      {error && (
        <div className="flex items-center gap-1.5 mt-2 text-sm text-danger-600">
          <WarningCircle size={14} weight="fill" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default Textarea;
