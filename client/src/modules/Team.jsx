import { fetcher } from "../shared/api/Fetcher";
import useSWR from "swr";

const TeamSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100">
    <div className="skeleton w-20 h-20 rounded-xl mx-auto mb-4" />
    <div className="skeleton h-5 w-2/3 mx-auto mb-2" />
    <div className="skeleton h-4 w-1/2 mx-auto" />
  </div>
);

export const Team = () => {
  const { data, error, isLoading } = useSWR("/team", fetcher);

  return (
    <section id="team" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-[#5d75a5] mb-4">
            Professional Mutaxassislar
          </h2>
          <p className="text-[#5d75a5]/60 max-w-lg mx-auto">
            Har bir loyihani muvaffaqiyatli amalga oshirish uchun tajribali va
            kreativ mutaxassislar jamoasi
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#55b8ff] to-[#5d75a5] mx-auto rounded-full mt-5" />
        </div>

        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <TeamSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && (!data || data.length === 0) && (
          <p className="text-center text-[#5d75a5]/60 py-16">
            Hozircha jamoa ma'lumotlari mavjud emas
          </p>
        )}

        {!isLoading && data && data.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {data.map((worker) => (
                <div
                  key={worker._id}
                  className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#55b8ff]/30 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden mx-auto mb-4 bg-gradient-to-br from-[#55b8ff] to-[#5d75a5] p-0.5">
                    <img
                      className="w-full h-full object-cover rounded-[10px] group-hover:scale-105 transition-transform duration-300"
                      src={worker.image || "/placeholder.svg"}
                      alt={worker.name}
                    />
                  </div>
                  <h3 className="font-bold text-[#5d75a5] mb-1 group-hover:text-[#55b8ff] transition-colors duration-300">
                    {worker.name}
                  </h3>
                  <p className="text-[#5d75a5]/60 text-sm">{worker.job}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 flex justify-center">
              <div className="inline-flex items-center gap-8 bg-gradient-to-r from-blue-50 to-white rounded-2xl px-8 py-5 border border-[#55b8ff]/15">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#55b8ff]">
                    {data.length}+
                  </div>
                  <div className="text-[#5d75a5]/60 text-xs font-medium">
                    Mutaxassislar
                  </div>
                </div>
                <div className="w-px h-10 bg-[#55b8ff]/20" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#55b8ff]">100+</div>
                  <div className="text-[#5d75a5]/60 text-xs font-medium">
                    Loyihalar
                  </div>
                </div>
                <div className="w-px h-10 bg-[#55b8ff]/20" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#55b8ff]">5+</div>
                  <div className="text-[#5d75a5]/60 text-xs font-medium">
                    Yillik tajriba
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
