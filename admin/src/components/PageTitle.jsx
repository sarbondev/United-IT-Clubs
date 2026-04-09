function PageTitle({ children, className = "", subtitle }) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h1 className="display-title text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
        {children}
      </h1>
      {subtitle && (
        <p className="max-w-2xl text-sm font-medium leading-6 text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PageTitle;
