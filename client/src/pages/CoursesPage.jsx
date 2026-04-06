import { Link } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../middlewares/Fetcher";

const CourseSkeleton = () => (
  <div className="bg-white rounded-2xl border border-[#55b8ff]/10 overflow-hidden">
    <div className="skeleton h-52 rounded-none" />
    <div className="p-6">
      <div className="skeleton h-6 w-3/4 mb-3" />
      <div className="skeleton h-4 w-full mb-2" />
      <div className="skeleton h-4 w-5/6 mb-2" />
      <div className="skeleton h-4 w-4/6 mb-5" />
      <div className="pt-4 border-t border-gray-100 flex justify-between">
        <div className="skeleton h-6 w-28" />
        <div className="skeleton h-5 w-32" />
      </div>
    </div>
  </div>
);

export const CoursesPage = () => {
  const { data: courses, error, isLoading } = useSWR("/courses", fetcher);

  return (
    <section className="min-h-screen py-20 px-4 bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#55b8ff] hover:text-[#5d75a5] transition-colors duration-300 font-medium text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Bosh sahifa
          </Link>
        </div>

        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5d75a5] mb-4">
            Barcha Kurslar
          </h1>
          <p className="text-[#5d75a5]/60 text-lg max-w-2xl mx-auto">
            Professional kurslarimiz orqali yangi ko'nikmalarga ega bo'ling va karyerangizni boshlang
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#55b8ff] to-[#5d75a5] mx-auto rounded-full mt-6" />
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CourseSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && (!courses || courses.length === 0) && (
          <div className="text-center py-16">
            <p className="text-[#5d75a5]/60 text-lg">Hozircha kurslar mavjud emas</p>
          </div>
        )}

        {!isLoading && courses && courses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="group bg-white rounded-2xl border border-[#55b8ff]/15 hover:border-[#55b8ff]/40 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {course.image ? (
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="h-52 bg-gradient-to-br from-[#55b8ff]/15 to-[#5d75a5]/15 flex items-center justify-center">
                    <svg className="w-14 h-14 text-[#55b8ff]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-[#5d75a5] mb-2">
                    {course.title}
                  </h3>
                  <p className="text-[#5d75a5]/60 text-sm leading-relaxed mb-5 flex-1">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-end pt-4 border-t border-[#55b8ff]/10">
                    <a
                      href="/#booking"
                      className="text-sm font-semibold text-[#5d75a5] hover:text-[#55b8ff] transition-colors duration-300 flex items-center gap-1"
                    >
                      Ro'yxatdan o'tish
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
