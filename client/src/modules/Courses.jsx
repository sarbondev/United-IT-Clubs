import { Link } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../shared/api/Fetcher";

const CourseSkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
    <div className="skeleton h-48" />
    <div className="p-6">
      <div className="skeleton h-5 w-3/4 mb-3" />
      <div className="skeleton h-4 w-full mb-2" />
      <div className="skeleton h-4 w-5/6" />
    </div>
  </div>
);

export const Courses = () => {
  const { data: courses, error, isLoading } = useSWR("/courses", fetcher);

  return (
    <section id="courses" className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-lg">
            <span className="text-[#2563EB] text-xs font-bold uppercase tracking-widest">Kurslar</span>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] mt-3 leading-tight">
              Bizning kurslarimiz
            </h2>
          </div>
          <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
            Professional kurslarimiz orqali yangi ko'nikmalarga ega bo'ling va karyerangizni boshlang.
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <CourseSkeleton key={i} />)}
          </div>
        )}

        {!isLoading && (!courses || courses.length === 0) && (
          <p className="text-center text-slate-400 py-16">Hozircha kurslar mavjud emas</p>
        )}

        {!isLoading && courses && courses.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {courses.slice(0, 6).map((course) => (
                <div key={course._id}
                  className="group bg-white rounded-2xl border border-slate-100 hover:border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                  {course.image ? (
                    <div className="overflow-hidden h-48">
                      <img src={course.image} alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="h-48 bg-blue-50 flex items-center justify-center">
                      <svg className="w-12 h-12 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-[#0F172A] mb-2">{course.title}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2 flex-1">{course.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link to="/courses"
                className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-[#2563EB] text-slate-700 hover:text-[#2563EB] font-semibold px-7 py-3 rounded-xl transition-all duration-200 text-sm">
                Barcha kurslarni ko'rish
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
