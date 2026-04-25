import img1 from "../shared/assets/features/1.png";
import img2 from "../shared/assets/features/2.png";
import img3 from "../shared/assets/features/3.png";
import img4 from "../shared/assets/features/4.png";
import img5 from "../shared/assets/features/5.png";
import img6 from "../shared/assets/features/6.png";

const cards = [
  { title: "Tajribali mentorlar", description: "Har bir mentor dars o'tish va loyihalar ustida ishlashda yetarlicha tajribaga ega.", icon: img1 },
  { title: "30% nazariy, 70% amaliy", description: "Amaliy ish bajarish ko'proq tashkil etilgan. Real loyihalar orqali o'rganasiz.", icon: img2 },
  { title: "Individual yordam", description: "O'rganish mobaynida yuzaga keladigan savollar va qiyinchiliklarda yordam olasiz.", icon: img3 },
  { title: "Jamoa bo'lib ishlash", description: "Guruhlardagi o'rganuvchilar jamoaviy muhitda fikr va tajriba almashishlari mumkin.", icon: img4 },
  { title: "Ish topish konsultatsiyasi", description: "Kurslarni yakunlagach ish topish va frilansda ishlash uchun yordam olish mumkin.", icon: img5 },
  { title: "Sertifikat", description: "Kurslarni muvaffaqiyatli tugatgan o'quvchilar tan olingan sertifikat bilan taqdirlanadilar.", icon: img6 },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-xl mb-14">
          <span className="text-[#2563EB] text-xs font-bold uppercase tracking-widest">Afzalliklar</span>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0F172A] mt-3 mb-4 leading-tight">
            Nima uchun aynan biz?
          </h2>
          <p className="text-slate-500 text-lg">
            Sifatli ta'lim va professional rivojlanish uchun zarur bo'lgan hamma narsa bir joyda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => (
            <div key={card.title}
              className="group p-7 bg-white rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-[#2563EB] transition-colors duration-300">
                  <img src={card.icon} alt={card.title} className="w-6 h-6 group-hover:brightness-[100] group-hover:invert transition-all duration-300" />
                </div>
              </div>
              <h3 className="font-bold text-[#0F172A] text-base mb-2">{card.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
