import { Trash, PencilSimple } from "@phosphor-icons/react";

function ActionButtons({
  onEdit,
  onDelete,
  editPath,
  className = "",
  size = "md",
}) {
  const sizes = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-2.5",
  };

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20,
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {onEdit && (
        <button
          onClick={onEdit}
          className={`${sizes[size]} text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors`}
          title="Tahrirlash"
        >
          <PencilSimple size={iconSizes[size]} weight="bold" />
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          className={`${sizes[size]} text-danger-600 hover:text-danger-700 hover:bg-danger-50 rounded-lg transition-colors`}
          title="O'chirish"
        >
          <Trash size={iconSizes[size]} weight="bold" />
        </button>
      )}
    </div>
  );
}

export default ActionButtons;
