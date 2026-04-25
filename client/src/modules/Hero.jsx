import { useState } from "react";
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from "../shared/config/config";

const stats = [
  { number: "100+", label: "Mutaxassislar" },
  { number: "50+", label: "Loyihalar" },
  { number: "10+", label: "Yo'nalishlar" },
  { number: "2022", label: "Tashkil etilgan" },
];

export function Hero() {
  const [formData, setFormData] = useState({ fullname: "", contact: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const text = `📋 *Yangi ro'yxatdan o'tish!*\n\n👤 *Ism:* ${formData.fullname}\n📞 *Telefon:* ${formData.contact}`;
    try {
      const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: "Markdown" }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setFormData({ fullname: "", contact: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,#dbeafe,transparent)] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[88vh] py-16">

          {/* Left */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              IT ta'lim markazi · 2022
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[4rem] font-black leading-[1.06] tracking-tight text-[#0F172A]">
              IT sohasida<br />
              <span className="text-[#2563EB]">kelajak kasblarini</span><br />
              o'rgating!
            </h1>

            <p className="text-slate-500 text-lg leading-relaxed max-w-md">
              Professional mentorlar, amaliy loyihalar va zamonaviy ta'lim dasturlari orqali
              IT sohasida karyerangizni boshlang.
            </p>

            <div className="flex items-center gap-4">
              <a href="tel:+998906900048"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-[#2563EB] font-semibold text-sm transition-colors duration-200">
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                +998 90 690 00 48
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/80 p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#0F172A] font-bold text-lg">Muvaffaqiyatli yuborildi!</p>
                  <p className="text-slate-500 text-sm mt-1">Tez orada siz bilan bog'lanamiz</p>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-7">
                  <h2 className="text-[#0F172A] font-bold text-2xl mb-1.5">Bepul konsultatsiya</h2>
                  <p className="text-slate-400 text-sm">Ma'lumotlaringizni qoldiring, siz bilan bog'lanamiz</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text" name="fullname" value={formData.fullname}
                    onChange={handleChange} placeholder="Ismingiz" required
                    className="w-full border-2 border-slate-100 focus:border-[#2563EB] bg-slate-50 focus:bg-white text-[#0F172A] placeholder-slate-400 p-4 rounded-2xl outline-none transition-all duration-200 text-sm"
                  />
                  <input
                    type="tel" name="contact" value={formData.contact}
                    onChange={handleChange} placeholder="+998 00 000 00 00" required
                    className="w-full border-2 border-slate-100 focus:border-[#2563EB] bg-slate-50 focus:bg-white text-[#0F172A] placeholder-slate-400 p-4 rounded-2xl outline-none transition-all duration-200 text-sm"
                  />
                  {status === "error" && (
                    <p className="text-red-500 text-xs">Xatolik yuz berdi. Qaytadan urinib ko'ring.</p>
                  )}
                  <button type="submit" disabled={status === "sending"}
                    className="w-full bg-[#F97316] hover:bg-[#EA6C0A] disabled:opacity-60 text-white font-bold py-4 rounded-2xl transition-colors duration-200 text-sm">
                    {status === "sending" ? "Yuborilmoqda..." : "Ro'yxatdan o'tish →"}
                  </button>
                </form>
                <p className="text-slate-400 text-xs text-center mt-4">
                  Shaxsiy ma'lumotlaringiz uchinchi shaxslarga berilmaydi
                </p>
              </>
            )}
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label}
                className={`py-6 px-2 flex flex-col gap-1 ${i < 3 ? "md:border-r border-slate-100" : ""} ${i % 2 === 0 ? "border-r border-slate-100 md:border-r-0" : ""}`}>
                <span className="text-3xl font-black text-[#2563EB]">{s.number}</span>
                <span className="text-slate-500 text-sm font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
