import { FolderOpen } from "@phosphor-icons/react";

function NoDataTitle({ children, description }) {
  return (
    <div className="section-card flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
        <FolderOpen className="text-slate-400" size={40} weight="light" />
      </div>
      <h3 className="display-title mb-2 text-2xl font-bold text-slate-800">
        {children}
      </h3>
      {description && (
        <p className="max-w-md text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}

export default NoDataTitle;
