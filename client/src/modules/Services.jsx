import { Link } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../middlewares/Fetcher";

const ServiceSkeleton = () => (
  <div className="p-7 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-[#55b8ff]/10">
    <div className="skeleton w-14 h-14 rounded-xl mb-5" />
    <div className="skeleton h-6 w-3/4 mb-3" />
    <div className="skeleton h-4 w-full mb-2" />
    <div className="skeleton h-4 w-5/6 mb-2" />
    <div className="skeleton h-4 w-2/3" />
  </div>
);

export const Services = () => {
  const { data: services, error, isLoading } = useSWR("/services", fetcher);

  return (
    <section id="services" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-[#5d75a5] mb-4">
            Bizning Xizmatlarimiz
          </h2>
          <p className="text-[#5d75a5]/60 max-w-lg mx-auto">
            Professional IT xizmatlarimiz bilan biznesingizni raqamlashtiring
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#55b8ff] to-[#5d75a5] mx-auto rounded-full mt-5" />
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ServiceSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && (!services || services.length === 0) && (
          <p className="text-center text-[#5d75a5]/60 py-16">Hozircha xizmatlar mavjud emas</p>
        )}

        {!isLoading && services && services.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(0, 6).map((service) => (
                <div
                  key={service._id}
                  className="group p-7 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-[#55b8ff]/15 hover:border-[#55b8ff]/40 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#55b8ff] to-[#5d75a5] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#5d75a5] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[#5d75a5]/60 leading-relaxed text-sm line-clamp-3">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            {services.length > 6 && (
              <div className="text-center mt-10">
                <Link
                  to="/services"
                  className="inline-block px-7 py-3 bg-gradient-to-r from-[#55b8ff] to-[#5d75a5] text-white font-semibold rounded-xl hover:from-[#5d75a5] hover:to-[#55b8ff] transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Barcha xizmatlarni ko'rish
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
