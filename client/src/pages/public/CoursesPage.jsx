import { Link } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../../shared/api/Fetcher";

const CourseSkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
    <div className="skeleton h-52" />
    <div className="p-6">
      <div className="skeleton h-5 w-3/4 mb-3" />
      <div className="skeleton h-4 w-full mb-2" />
      <div className="skeleton h-4 w-5/6 mb-5" />
      <div className="skeleton h-9 w-full rounded-xl" />
    </div>
  </div>
);

export const CoursesPage = () => {
  const { data: courses, error, isLoading } = useSWR("/courses", fetcher);

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
              <span className="text-[#2563EB] text-xs font-bold uppercase tracking-widest">Ta'lim</span>
              <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] mt-3 leading-tight">
                Barcha kurslar
              </h1>
              <p className="text-slate-500 text-lg mt-3 max-w-lg">
                Professional kurslarimiz orqali yangi ko'nikmalarga ega bo'ling va karyerangizni boshlang.
              </p>
            </div>
            {!isLoading && courses && courses.length > 0 && (
              <div className="flex-shrink-0 bg-white rounded-2xl border border-slate-100 px-6 py-4 shadow-sm">
                <div className="text-3xl font-black text-[#2563EB]">{courses.length}</div>
                <div className="text-slate-500 text-sm font-medium">ta kurs mavjud</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-7xl px-4 md:px-8 py-14">
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <CourseSkeleton key={i} />)}
          </div>
        )}

        {!isLoading && (!courses || courses.length === 0) && (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-slate-400 text-lg font-medium">Hozircha kurslar mavjud emas</p>
            <p className="text-slate-300 text-sm mt-1">Tez orada yangi kurslar qo'shiladi</p>
          </div>
        )}

        {!isLoading && courses && courses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course) => (
              <div key={course._id}
                className="group bg-white rounded-2xl border border-slate-100 hover:border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">

                {/* Image */}
                {course.image ? (
                  <div className="overflow-hidden h-52">
                    <img src={course.image} alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="h-52 bg-blue-50 flex items-center justify-center">
                    <svg className="w-12 h-12 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                )}

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-[#0F172A] mb-2 leading-snug">{course.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1 line-clamp-3">{course.description}</p>

                  <a href="/#booking"
                    className="mt-5 flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 text-sm">
                    Ro'yxatdan o'tish
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-[#2563EB]">
        <div className="container mx-auto max-w-7xl px-4 md:px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-1">
              Qaysi kurs siz uchun?
            </h2>
            <p className="text-blue-200 text-sm">Biz bilan bog'laning, to'g'ri yo'nalishni tanlab beramiz</p>
          </div>
          <a href="tel:+998906900048"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-bold px-7 py-3.5 rounded-xl transition-colors duration-200 text-sm shadow-lg">
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
