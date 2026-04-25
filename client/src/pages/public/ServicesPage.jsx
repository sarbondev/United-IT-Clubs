import { Link } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../../shared/api/Fetcher";

const ServiceSkeleton = () => (
  <div className="p-7 bg-white rounded-2xl border border-slate-100">
    <div className="skeleton w-14 h-14 rounded-xl mb-5" />
    <div className="skeleton h-6 w-3/4 mb-3" />
    <div className="skeleton h-4 w-full mb-2" />
    <div className="skeleton h-4 w-5/6 mb-2" />
    <div className="skeleton h-4 w-2/3" />
  </div>
);

export const ServicesPage = () => {
  const { data: services, error, isLoading } = useSWR("/services", fetcher);

  return (
    <section className="min-h-screen py-20 px-4 bg-[#F8FAFC]">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-[#0EA5E9] transition-colors duration-200 font-medium text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Bosh sahifa
          </Link>
        </div>

        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
            Bizning Xizmatlarimiz
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-6">
            Biz sizning biznesingiz uchun professional IT xizmatlarini taqdim etamiz
          </p>
          <div className="w-16 h-1 bg-[#0EA5E9] mx-auto rounded-full" />
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ServiceSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && (!services || services.length === 0) && (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">Hozircha xizmatlar mavjud emas</p>
          </div>
        )}

        {!isLoading && services && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service._id}
                className="group p-7 bg-white rounded-2xl border border-slate-100 hover:border-[#0EA5E9]/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-sky-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#0EA5E9] transition-colors duration-300">
                  <svg className="w-7 h-7 text-[#0EA5E9] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center bg-[#0F172A] rounded-2xl p-10">
          <h2 className="text-3xl font-bold text-white mb-3">Xizmat kerakmi?</h2>
          <p className="text-slate-400 text-lg mb-6 max-w-xl mx-auto">
            Bizga murojaat qiling va biz sizning loyihangiz uchun eng yaxshi yechimni topamiz
          </p>
          <a
            href="tel:+998906900048"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold rounded-xl transition-colors duration-200 shadow-md"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Bog'lanish
          </a>
        </div>
      </div>
    </section>
  );
};
