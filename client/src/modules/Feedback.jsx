import useSWR from "swr";
import { fetcher } from "../shared/api/Fetcher";

export const Feedback = () => {
  const {
    data: studentFeedbacks,
    error: studentError,
    isLoading: studentLoading,
  } = useSWR("/studentFeedbacks", fetcher);
  const {
    data: parentFeedbacks,
    error: parentError,
    isLoading: parentLoading,
  } = useSWR("/parentFeedbacks", fetcher);

  const allFeedbacks = [
    ...(studentFeedbacks || []).map((f) => ({ ...f, type: "student" })),
    ...(parentFeedbacks || []).map((f) => ({ ...f, type: "parent" })),
  ];

  const isLoading = studentLoading || parentLoading;
  const error = studentError || parentError;

  if (isLoading) {
    return (
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#5d75a5] mb-4">Fikrlar</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#55b8ff] to-[#5d75a5] mx-auto rounded-full" />
          </div>
          <div className="text-center">Yuklanmoqda...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#5d75a5] mb-4">Fikrlar</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#55b8ff] to-[#5d75a5] mx-auto rounded-full" />
          </div>
          <div className="text-center">Xatolik yuz berdi</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-[#5d75a5] mb-4">Fikrlar</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#55b8ff] to-[#5d75a5] mx-auto rounded-full" />
        </div>

        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <TeamSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && (!allFeedbacks || allFeedbacks.length === 0) && (
          <p className="text-center text-[#5d75a5]/60 py-16">
            Hozircha fikrlar mavjud emas
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allFeedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="aspect-video">
                {feedback.videoFile ? (
                  <video
                    src={feedback.videoFile}
                    controls
                    preload="metadata"
                    className="w-full h-full object-cover"
                    title={`${feedback.type === "student" ? "O'quvchi" : "Ota-ona"} fikri`}
                  >
                    Brauzeringiz video formatini qo'llab-quvvatlamaydi.
                  </video>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                    Video mavjud emas
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#5d75a5] mb-2">
                  {feedback.type === "student"
                    ? `${feedback.name} ${feedback.surname}`
                    : feedback.name
                      ? `${feedback.name} ${feedback.surname || ""}`.trim()
                      : "Ota-ona"}
                </h3>
                <p className="text-gray-600">{feedback.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
