import img1 from "../shared/assets/features/1.png";
import img2 from "../shared/assets/features/2.png";
import img3 from "../shared/assets/features/3.png";
import img4 from "../shared/assets/features/4.png";
import img5 from "../shared/assets/features/5.png";
import img6 from "../shared/assets/features/6.png";

const cards = [
  {
    title: "Tajribali mentorlar",
    description:
      "Har bir mentor dars o'tish va loyihalar ustida ishlashda yetarlicha tajribaga ega.",
    icon: img1,
  },
  {
    title: "30% nazariy, 70% amaliy",
    description:
      "Darslar nazariy va amaliy tarzda olib boriladi. Amaliy ish bajarish ko'proq tashkil etilgan.",
    icon: img2,
  },
  {
    title: "Individual yordam",
    description:
      "O'rganish mobaynida yuzaga keladigan savollar va qiyinchiliklarda mentorlardan yordam olish mumkin.",
    icon: img3,
  },
  {
    title: "Jamoa bo'lib ishlash",
    description:
      "Kurs davomida guruhlardagi o'rganuvchilar jamoaviy muhitda fikr va tajriba almashishlari mumkin.",
    icon: img4,
  },
  {
    title: "Ish topish uchun konsultatsiya",
    description:
      "Kurslarni yakunlagach ish topish va frilansda ishlash uchun mentorlardan yordam olish imkoniyati mavjud.",
    icon: img5,
  },
  {
    title: "Sertifikat",
    description:
      "Kurslarni muvaffaqiyatli tugatgan o'quvchilar sertifikat bilan taqdirlanadilar.",
    icon: img6,
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-[#5d75a5] mb-4">
            Bizning afzalliklarimiz
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#55b8ff] to-[#5d75a5] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="p-7 bg-white rounded-2xl border border-[#55b8ff]/15 hover:border-[#55b8ff]/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg text-[#5d75a5] pr-4">{card.title}</h3>
                <img src={card.icon} alt={card.title} className="w-12 h-12 flex-shrink-0" />
              </div>
              <p className="text-[#5d75a5]/60 text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
