export const About = () => {
  return (
    <section id="about" className="py-24 px-4 bg-[#F8FAFC]">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#2563EB] text-xs font-bold uppercase tracking-widest">Biz haqimizda</span>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] mt-3 mb-6 leading-tight">
              United IT Clubs —{" "}
              <span className="text-[#2563EB]">kelajak akademiyasi</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-md">
              O'zbekistonning IT sohasidagi xalqaro standartlarga javob beradigan jamoani
              shakllantirish va yosh dasturchilarga professional imkoniyatlar yaratish.
            </p>
            <a href="/#booking"
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-3.5 px-7 rounded-xl transition-colors duration-200 text-sm">
              Bizga qo'shiling
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { number: "100+", label: "Tajribali mutaxassislar", bg: "bg-blue-50", text: "text-[#2563EB]" },
              { number: "50+", label: "Muvaffaqiyatli loyihalar", bg: "bg-orange-50", text: "text-[#F97316]" },
              { number: "10+", label: "Ta'lim yo'nalishlari", bg: "bg-emerald-50", text: "text-emerald-600" },
              { number: "2022", label: "Tashkil etilgan yil", bg: "bg-purple-50", text: "text-purple-600" },
            ].map((s) => (
              <div key={s.label} className={`${s.bg} rounded-2xl p-7`}>
                <div className={`text-4xl font-black ${s.text} mb-2`}>{s.number}</div>
                <div className="text-slate-600 text-sm font-medium leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
