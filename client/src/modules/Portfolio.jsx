import { useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../shared/api/Fetcher";

const categories = [
  { key: "", label: "Hammasi" },
  { key: "web", label: "Vebsayt" },
  { key: "design", label: "Brending" },
  { key: "modeling", label: "3D modeling" },
];

export const Portfolio = () => {
  const [selected, setSelected] = useState("");
  const { data: projects, isLoading } = useSWR("/projects", fetcher);

  const filtered = projects?.projects?.filter((p) => !selected || p.category === selected) || [];

  return (
    <section className="py-24 px-4 bg-[#F8FAFC]" id="our-projects">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-[#2563EB] text-xs font-bold uppercase tracking-widest">Portfolio</span>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] mt-3 leading-tight">
              Biz qilgan loyihalar
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat.key} onClick={() => setSelected(cat.key)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  selected === cat.key
                    ? "bg-[#2563EB] text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-[#2563EB] hover:text-[#2563EB]"
                }`}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-60 rounded-2xl break-inside-avoid mb-4" />
            ))}
          </div>
        )}

        {!isLoading && filtered.length > 0 && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((item) => (
              <Link key={item._id} to={`/${item._id}`}
                className="group block overflow-hidden rounded-2xl bg-white border border-slate-100 hover:border-blue-100 shadow-sm hover:shadow-xl transition-all duration-300 break-inside-avoid mb-4">
                <div className="relative overflow-hidden">
                  <img src={item.images?.[0] || "/placeholder.svg"} alt={item.title}
                    className="w-full h-auto min-h-[200px] max-h-[400px] object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-base font-bold mb-1 line-clamp-1">{item.title}</h3>
                    <span className="inline-block bg-[#2563EB] text-white text-xs px-3 py-1 rounded-full font-semibold">
                      {item.category === "web" ? "Vebsayt" : item.category === "design" ? "Brending" : item.category === "modeling" ? "3D modeling" : "Umumiy"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <p className="text-center text-slate-400 py-16">Hozircha loyihalar mavjud emas</p>
        )}
      </div>
    </section>
  );
};
