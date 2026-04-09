export const About = () => {
  const stats = [
    { number: "100+", label: "Mutaxassislar" },
    { number: "2022", label: "Tashkil etilgan" },
    { number: "50+", label: "Loyihalar" },
    { number: "10+", label: "Yo'nalishlar" },
  ];

  return (
    <section
      id="about"
      className="py-20 px-4 bg-gradient-to-br from-white via-blue-50 to-white overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#5d75a5] mb-4">
            United IT Clubs
          </h2>
          <p className="text-lg text-[#5d75a5]/70 max-w-2xl mx-auto leading-relaxed">
            O'zbekistonning IT sohasidagi xalqaro standartlarga javob beradigan
            jamoani shakllantirish va yosh dasturchilarga professional
            imkoniyatlar yaratish
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#55b8ff] to-[#5d75a5] mx-auto rounded-full mt-6" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-[#55b8ff]/15 hover:border-[#55b8ff]/30 transition-all duration-300 shadow-sm"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#55b8ff] mb-1">
                {stat.number}
              </div>
              <div className="text-[#5d75a5] font-medium text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
