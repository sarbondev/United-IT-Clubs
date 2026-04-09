import { List } from "@phosphor-icons/react";

export const Topbar = ({ onOpenSidebar }) => {
  return (
    <header className="sticky top-0 z-10 px-4 pt-4 md:px-6 md:pt-6">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-[24px] px-1 py-1 md:px-0">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200/70 bg-white/80 text-slate-700 shadow-soft-sm transition hover:bg-white md:hidden"
          aria-label="Open sidebar"
        >
          <List size={22} />
        </button>
        <div className="hidden md:block" />
      </div>
    </header>
  );
};
