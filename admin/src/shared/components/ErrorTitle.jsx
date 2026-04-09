import { Warning, ArrowClockwise } from "@phosphor-icons/react";

function ErrorTitle({ children, onRetry }) {
  return (
    <div className="section-card flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-danger-50">
        <Warning className="text-danger-600" size={32} weight="fill" />
      </div>
      <h3 className="display-title mb-2 text-2xl font-bold text-slate-950">
        {children}
      </h3>
      <p className="mb-6 max-w-md text-sm leading-6 text-slate-500">
        Xatolik yuz berdi. Qayta urinish uchun tugmani bosing.
      </p>
      <button
        onClick={onRetry || (() => window.location.reload())}
        className="btn btn-primary"
      >
        <ArrowClockwise size={16} />
        Yangilash
      </button>
    </div>
  );
}

export default ErrorTitle;
