import { useState } from "react";
import { Link } from "react-router-dom";
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from "../shared/config/config";

const floatingBadges = [
  { text: "Amaliy loyihalar", top: "12%", right: "8%", delay: "0s" },
  { text: "Jamoada ishlash", top: "38%", right: "2%", delay: "0.5s" },
  { text: "Kreativ fikrlash", top: "62%", right: "12%", delay: "1s" },
  { text: "Professional mentorlar", top: "82%", right: "4%", delay: "1.5s" },
];

export function Hero() {
  const [formData, setFormData] = useState({
    fullname: "",
    contact: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const text =
      `📋 *Yangi ro'yxatdan o'tish!*\n\n` +
      `👤 *Ism:* ${formData.fullname}\n` +
      `📞 *Telefon:* ${formData.contact}`;

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text,
            parse_mode: "Markdown",
          }),
        },
      );
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
    <section className="relative min-h-[92vh] w-full flex items-center overflow-hidden bg-gradient-to-br from-[#f0f7ff] via-white to-[#f5f0ff]">
      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-[#55b8ff]/[0.07] blur-3xl" />
        <div className="absolute -bottom-32 right-[20%] w-[400px] h-[400px] rounded-full bg-[#5d75a5]/[0.06] blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-12 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-6 items-center max-w-7xl mx-auto">
          {/* Left — heading + form */}
          <div className="max-w-xl">
            <h1 className="text-[2.6rem] sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.1] tracking-tight mb-6">
              <span className="text-[#1e293b]">IT sohasida </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#55b8ff] to-[#5d75a5]">
                kelajak kasblarini
              </span>
              <span className="text-[#1e293b]"> o'rgating!</span>
            </h1>

            <p className="text-[#5d75a5]/70 text-lg mb-10 leading-relaxed max-w-md">
              Professional mentorlar, amaliy loyihalar va zamonaviy ta'lim
              dasturlari
            </p>

            {/* Form */}
            {status === "success" ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-green-800 font-semibold">
                  Muvaffaqiyatli yuborildi!
                </p>
                <p className="text-green-600 text-sm mt-1">
                  Tez orada siz bilan bog'lanamiz
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Ismingiz"
                  required
                  className="w-full bg-white border-2 border-gray-200 hover:border-[#55b8ff]/40 focus:border-[#55b8ff] p-4 rounded-2xl outline-none transition-colors duration-200 placeholder-gray-400 text-[#1e293b] shadow-sm"
                />

                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="+998 00-000-0000"
                  required
                  className="w-full bg-white border-2 border-gray-200 hover:border-[#55b8ff]/40 focus:border-[#55b8ff] p-4 rounded-2xl outline-none transition-colors duration-200 placeholder-gray-400 text-[#1e293b] shadow-sm"
                />

                {status === "error" && (
                  <p className="text-red-500 text-sm">
                    Xatolik yuz berdi. Qaytadan urinib ko'ring.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-gradient-to-r from-[#55b8ff] to-[#5d75a5] hover:from-[#4da8ee] hover:to-[#4e6694] text-white font-bold text-lg py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60"
                >
                  {status === "sending"
                    ? "Yuborilmoqda..."
                    : "Ro'yxatdan o'tish"}
                </button>
              </form>
            )}
          </div>

          {/* Right — decorative visual */}
          <div className="hidden lg:block relative h-[520px]">
            {/* Main decorative circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#55b8ff]/20 to-[#5d75a5]/10 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-[#55b8ff]/15 to-transparent border-2 border-dashed border-[#55b8ff]/20 animate-[spin_30s_linear_infinite_reverse]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  className="rounded-full"
                  src="https://static.vecteezy.com/system/resources/previews/034/966/435/non_2x/ai-generated-portrait-of-student-background-free-png.png"
                  alt=""
                />
              </div>
            </div>

            {/* Smaller floating shapes */}
            <div className="absolute top-[5%] left-[15%] w-16 h-16 rounded-2xl bg-gradient-to-br from-[#55b8ff]/30 to-[#55b8ff]/10 rotate-12 shadow-md" />
            <div className="absolute bottom-[10%] left-[8%] w-12 h-12 rounded-full bg-gradient-to-br from-[#5d75a5]/25 to-[#5d75a5]/10 shadow-md" />
            <div className="absolute top-[15%] right-[30%] w-10 h-10 rounded-xl bg-[#55b8ff]/15 -rotate-6" />
            <div className="absolute bottom-[20%] right-[28%] w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5d75a5]/20 to-transparent rotate-45 shadow-sm" />

            {/* Floating badges */}
            {floatingBadges.map((badge) => (
              <div
                key={badge.text}
                className="absolute bg-white shadow-lg border border-gray-100 rounded-full px-5 py-2.5 text-sm font-semibold text-[#5d75a5] hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-default"
                style={{
                  top: badge.top,
                  right: badge.right,
                  animation: `float 3s ease-in-out ${badge.delay} infinite`,
                }}
              >
                {badge.text}
              </div>
            ))}

            {/* Dots decoration */}
            <div className="absolute bottom-[35%] left-[5%] grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#55b8ff]/20" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
