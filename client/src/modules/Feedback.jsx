import useSWR from "swr";
import { fetcher } from "../shared/api/Fetcher";

export const Feedback = () => {
  const { data: studentFeedbacks, error: sErr, isLoading: sLoading } = useSWR("/studentFeedbacks", fetcher);
  const { data: parentFeedbacks, error: pErr, isLoading: pLoading } = useSWR("/parentFeedbacks", fetcher);

  const allFeedbacks = [
    ...(studentFeedbacks || []).map((f) => ({ ...f, type: "student" })),
    ...(parentFeedbacks || []).map((f) => ({ ...f, type: "parent" })),
  ];

  const isLoading = sLoading || pLoading;

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-xl mb-14">
          <span className="text-[#2563EB] text-xs font-bold uppercase tracking-widest">Fikrlar</span>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] mt-3 leading-tight">
            Ular nima deyishadi?
          </h2>
        </div>

        {isLoading && <p className="text-slate-400 py-16 text-center">Yuklanmoqda...</p>}

        {!isLoading && allFeedbacks.length === 0 && (
          <p className="text-center text-slate-400 py-16">Hozircha fikrlar mavjud emas</p>
        )}

        {!isLoading && allFeedbacks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allFeedbacks.map((feedback) => (
              <div key={feedback._id}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-blue-100 hover:shadow-lg transition-all duration-300">
                <div className="aspect-video bg-slate-50">
                  {feedback.videoFile ? (
                    <video src={feedback.videoFile} controls preload="metadata"
                      className="w-full h-full object-cover">
                      Brauzeringiz video formatini qo'llab-quvvatlamaydi.
                    </video>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      Video mavjud emas
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${feedback.type === "student" ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"}`}>
                    {feedback.type === "student" ? "O'quvchi" : "Ota-ona"}
                  </span>
                  <h3 className="text-sm font-bold text-[#0F172A] mt-3 mb-1.5">
                    {feedback.type === "student"
                      ? `${feedback.name} ${feedback.surname}`
                      : feedback.name ? `${feedback.name} ${feedback.surname || ""}`.trim() : "Ota-ona"}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{feedback.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
