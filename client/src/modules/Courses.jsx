import { Link } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../shared/api/Fetcher";

const CourseSkeleton = () => (
  <div className="bg-white rounded-2xl border border-[#55b8ff]/10 overflow-hidden">
    <div className="skeleton h-48 rounded-none" />
    <div className="p-6">
      <div className="skeleton h-6 w-3/4 mb-3" />
      <div className="skeleton h-4 w-full mb-2" />
      <div className="skeleton h-4 w-5/6 mb-4" />
      <div className="skeleton h-5 w-1/3" />
    </div>
  </div>
);

export const Courses = () => {
  const { data: courses, error, isLoading } = useSWR("/courses", fetcher);

  return (
    <section id="courses" className="py-20 px-4 bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-[#5d75a5] mb-4">
            Bizning Kurslarimiz
          </h2>
          <p className="text-[#5d75a5]/60 max-w-lg mx-auto">
            Professional kurslarimiz orqali yangi ko'nikmalarga ega bo'ling
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#55b8ff] to-[#5d75a5] mx-auto rounded-full mt-5" />
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CourseSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && (!courses || courses.length === 0) && (
          <p className="text-center text-[#5d75a5]/60 py-16">Hozircha kurslar mavjud emas</p>
        )}

        {!isLoading && courses && courses.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.slice(0, 6).map((course) => (
                <div
                  key={course._id}
                  className="group bg-white rounded-2xl border border-[#55b8ff]/15 hover:border-[#55b8ff]/40 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {course.image ? (
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-[#55b8ff]/15 to-[#5d75a5]/15 flex items-center justify-center">
                      <svg className="w-14 h-14 text-[#55b8ff]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-[#5d75a5] mb-2">
                      {course.title}
                    </h3>
                    <p className="text-[#5d75a5]/60 text-sm line-clamp-2 mb-4 flex-1">
                      {course.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/courses"
                className="inline-block px-7 py-3 bg-gradient-to-r from-[#55b8ff] to-[#5d75a5] text-white font-semibold rounded-xl hover:from-[#5d75a5] hover:to-[#55b8ff] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Barcha kurslarni ko'rish
              </Link>
            </div>
          </>
        )}

      </div>
    </section>
  );
};
