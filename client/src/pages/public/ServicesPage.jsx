import { Link } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../../shared/api/Fetcher";

const ServiceSkeleton = () => (
  <div className="p-7 bg-white rounded-2xl border border-slate-100">
    <div className="skeleton w-12 h-12 rounded-xl mb-5" />
    <div className="skeleton h-5 w-3/4 mb-3" />
    <div className="skeleton h-4 w-full mb-2" />
    <div className="skeleton h-4 w-5/6" />
  </div>
);

export const ServicesPage = () => {
  const { data: services, error, isLoading } = useSWR("/services", fetcher);

  return (
    <div className="min-h-screen bg-white">

      {/* Page hero */}
      <div className="bg-[#F8FAFC] border-b border-slate-100">
        <div className="container mx-auto max-w-7xl px-4 md:px-8 py-14">
          <Link to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-[#2563EB] text-sm font-semibold transition-colors duration-200 mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Bosh sahifa
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[#2563EB] text-xs font-bold uppercase tracking-widest">Xizmatlar</span>
              <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] mt-3 leading-tight">
                Bizning xizmatlar
              </h1>
              <p className="text-slate-500 text-lg mt-3 max-w-lg">
                Professional IT xizmatlarimiz bilan biznesingizni raqamlashtiring va yangi darajaga olib chiqing.
              </p>
            </div>
            {!isLoading && services && services.length > 0 && (
              <div className="flex-shrink-0 bg-white rounded-2xl border border-slate-100 px-6 py-4 shadow-sm">
                <div className="text-3xl font-black text-[#2563EB]">{services.length}</div>
                <div className="text-slate-500 text-sm font-medium">ta xizmat</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-7xl px-4 md:px-8 py-14">
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <ServiceSkeleton key={i} />)}
          </div>
        )}

        {!isLoading && (!services || services.length === 0) && (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-slate-400 text-lg font-medium">Hozircha xizmatlar mavjud emas</p>
            <p className="text-slate-300 text-sm mt-1">Tez orada yangi xizmatlar qo'shiladi</p>
          </div>
        )}

        {!isLoading && services && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <div key={service._id}
                className="group p-7 bg-white rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#2563EB] transition-colors duration-300">
                  <svg className="w-6 h-6 text-[#2563EB] group-hover:text-white transition-colors duration-300"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] mb-2">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-[#0F172A]">
        <div className="container mx-auto max-w-7xl px-4 md:px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-1">
              Xizmat kerakmi?
            </h2>
            <p className="text-slate-400 text-sm">Bizga murojaat qiling, eng yaxshi yechimni topamiz</p>
          </div>
          <a href="tel:+998906900048"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-bold px-7 py-3.5 rounded-xl transition-colors duration-200 text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Bog'lanish
          </a>
        </div>
      </div>

    </div>
  );
};
