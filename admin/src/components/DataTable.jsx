import { useMemo, useState } from "react";
import { MagnifyingGlass, PencilSimple, Trash } from "@phosphor-icons/react";
import LoadingAnimation from "./LoadingAnimation";
import ErrorTitle from "./ErrorTitle";
import NoDataTitle from "./NoDataTitle";

function DataTable({
  title,
  description,
  columns,
  data = [],
  isPending,
  isError,
  error,
  onRetry,
  onEdit,
  onDelete,
  addAction,
  searchable = false,
  searchPlaceholder = "Qidirish...",
  headerContent,
  footerContent,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchable || !searchTerm.trim()) {
      return data;
    }

    const normalizedSearch = searchTerm.toLowerCase();

    return data.filter((item) =>
      columns.some((col) => {
        const value = col.accessor ? item[col.accessor] : "";
        return String(value ?? "").toLowerCase().includes(normalizedSearch);
      })
    );
  }, [columns, data, searchable, searchTerm]);

  return (
    <section className="page-shell">
      <div className="page-stack">
        <div className="section-card overflow-hidden p-6 md:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl">
              <div className="eyebrow">Collection</div>
              <h1 className="display-title mt-4 text-3xl font-bold text-slate-950 md:text-4xl">
                {title}
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                {description ||
                  `${filteredData.length} ta yozuv topildi. Jadval orqali tezkor ko'rish, tahrirlash va boshqarish mumkin.`}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {addAction}
            </div>
          </div>

          {(searchable || headerContent) && (
            <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {searchable ? (
                <div className="relative w-full max-w-xl">
                  <MagnifyingGlass
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-input !rounded-full py-3 pl-11 pr-4"
                  />
                </div>
              ) : (
                <div />
              )}
              {headerContent}
            </div>
          )}
        </div>

        {isPending ? (
          <LoadingAnimation>Ma'lumotlar yuklanmoqda...</LoadingAnimation>
        ) : isError ? (
          <ErrorTitle onRetry={onRetry}>{error || "Xatolik yuz berdi"}</ErrorTitle>
        ) : filteredData.length === 0 ? (
          <NoDataTitle
            description={searchTerm ? "Qidiruv bo'yicha mos natija topilmadi." : "Bu bo'limda hozircha ma'lumot yo'q."}
          >
            {searchTerm ? "Natija topilmadi" : "Bo'sh bo'lim"}
          </NoDataTitle>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  {columns.map((col, index) => (
                    <th key={col.accessor || index} className={col.headerClassName || ""}>
                      {col.header}
                    </th>
                  ))}
                  {(onEdit || onDelete) && <th className="text-center">Amallar</th>}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, rowIndex) => (
                  <tr key={item._id || rowIndex}>
                    {columns.map((col, colIndex) => (
                      <td key={col.accessor || colIndex}>
                        {col.render
                          ? col.render(item)
                          : col.accessor
                            ? item[col.accessor]
                            : null}
                      </td>
                    ))}
                    {(onEdit || onDelete) && (
                      <td className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          {onEdit && (
                            <button
                              type="button"
                              onClick={() => onEdit(item)}
                              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700"
                              title="Tahrirlash"
                            >
                              <PencilSimple size={18} />
                            </button>
                          )}
                          {onDelete && (
                            <button
                              type="button"
                              onClick={() => onDelete(item)}
                              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700"
                              title="O'chirish"
                            >
                              <Trash size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {footerContent}
      </div>
    </section>
  );
}

export default DataTable;
