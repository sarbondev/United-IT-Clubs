import { fetcher } from "../shared/api/Fetcher";
import useSWR from "swr";

const TeamSkeleton = () => (
  <div className="rounded-2xl overflow-hidden bg-white border border-slate-100">
    <div className="skeleton h-56" />
    <div className="p-4">
      <div className="skeleton h-5 w-3/4 mb-2" />
      <div className="skeleton h-4 w-1/2" />
    </div>
  </div>
);

export const Team = () => {
  const { data, isLoading } = useSWR("/team", fetcher);

  return (
    <section id="team" className="py-24 px-4 bg-[#F8FAFC]">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-[#2563EB] text-xs font-bold uppercase tracking-widest">Jamoa</span>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] mt-3 leading-tight">
              Professional mutaxassislar
            </h2>
          </div>
          <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
            Har bir loyihani muvaffaqiyatli amalga oshirish uchun tajribali va kreativ jamoa.
          </p>
        </div>

        {/* Grid */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <TeamSkeleton key={i} />)}
          </div>
        )}

        {!isLoading && (!data || data.length === 0) && (
          <p className="text-center text-slate-400 py-16">Hozircha jamoa ma'lumotlari mavjud emas</p>
        )}

        {!isLoading && data && data.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {data.map((worker) => (
                <div key={worker._id} className="group rounded-2xl overflow-hidden bg-white border border-slate-100 hover:border-blue-100 hover:shadow-xl transition-all duration-300">
                  {/* Photo */}
                  <div className="relative overflow-hidden h-56 bg-slate-100">
                    <img
                      src={worker.image || "/placeholder.svg"}
                      alt={worker.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#2563EB]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center px-4">
                        <p className="text-white font-bold text-base leading-snug">{worker.name}</p>
                        <p className="text-blue-200 text-xs mt-1">{worker.job}</p>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-[#0F172A] text-sm leading-snug mb-0.5">{worker.name}</h3>
                    <p className="text-slate-400 text-xs">{worker.job}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-3 md:w-fit md:mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              {[
                { n: `${data.length}+`, l: "Mutaxassislar" },
                { n: "100+", l: "Loyihalar" },
                { n: "5+", l: "Yillik tajriba" },
              ].map((s, i) => (
                <div key={s.l}
                  className={`px-10 py-6 text-center ${i < 2 ? "border-r border-slate-100" : ""}`}>
                  <div className="text-2xl font-black text-[#2563EB]">{s.n}</div>
                  <div className="text-slate-500 text-xs font-medium mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
