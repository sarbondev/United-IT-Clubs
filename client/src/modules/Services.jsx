import { Link } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../shared/api/Fetcher";

const ServiceSkeleton = () => (
  <div className="p-7 bg-white rounded-2xl border border-slate-100">
    <div className="skeleton w-12 h-12 rounded-xl mb-5" />
    <div className="skeleton h-5 w-3/4 mb-3" />
    <div className="skeleton h-4 w-full mb-2" />
    <div className="skeleton h-4 w-5/6" />
  </div>
);

export const Services = () => {
  const { data: services, error, isLoading } = useSWR("/services", fetcher);

  return (
    <section id="services" className="py-24 px-4 bg-[#F8FAFC]">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-lg">
            <span className="text-[#2563EB] text-xs font-bold uppercase tracking-widest">Xizmatlar</span>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] mt-3 leading-tight">
              Bizning xizmatlarimiz
            </h2>
          </div>
          <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
            Professional IT xizmatlarimiz bilan biznesingizni raqamlashtiring va yangi darajaga olib chiqing.
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <ServiceSkeleton key={i} />)}
          </div>
        )}

        {!isLoading && (!services || services.length === 0) && (
          <p className="text-center text-slate-400 py-16">Hozircha xizmatlar mavjud emas</p>
        )}

        {!isLoading && services && services.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.slice(0, 6).map((service) => (
                <div key={service._id}
                  className="group p-7 bg-white rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#2563EB] transition-colors duration-300">
                    <svg className="w-6 h-6 text-[#2563EB] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A] mb-2">{service.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{service.description}</p>
                </div>
              ))}
            </div>

            {services.length > 6 && (
              <div className="text-center mt-10">
                <Link to="/services"
                  className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-[#2563EB] text-slate-700 hover:text-[#2563EB] font-semibold px-7 py-3 rounded-xl transition-all duration-200 text-sm">
                  Barcha xizmatlarni ko'rish
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
