import { useState } from "react";
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from "../shared/config/config";


export const Booking = () => {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({ fullname: "", contact: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const text = `📋 *Yangi ro'yxatdan o'tish!*\n\n👤 *Ism:* ${formData.fullname}\n📞 *Telefon:* ${formData.contact}`;
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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section id="booking" className="py-24 px-4 bg-[#EFF6FF]">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-blue-50/50 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left info */}
            <div className="bg-[#2563EB] p-10 lg:p-14 flex flex-col justify-between gap-10">
              <div>
                <span className="text-blue-200 text-xs font-bold uppercase tracking-widest">
                  Ro'yxatdan o'tish
                </span>
                <h2 className="text-4xl font-black text-white mt-3 mb-4 leading-tight">
                  Bizga
                  <br />
                  qo'shiling!
                </h2>
                <p className="text-blue-100 text-base leading-relaxed max-w-xs">
                  Kelajakni biz bilan birga quring. Birinchi qadam — bu forma.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Professional mentorlar bilan o'rganing",
                  "Amaliy loyihalar ustida ishlang",
                  "Kasbiy sertifikat oling",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-blue-100 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right form */}
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              {status === "success" ? (
                <div className="flex flex-col items-center gap-4 py-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-green-500"
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
                  <p className="text-[#0F172A] font-bold text-xl">
                    Muvaffaqiyatli yuborildi!
                  </p>
                  <p className="text-slate-500 text-sm">
                    Tez orada siz bilan bog'lanamiz
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-black text-[#0F172A] mb-1.5">
                    Forma to'ldiring
                  </h3>
                  <p className="text-slate-400 text-sm mb-8">
                    Ma'lumotlaringizni kiriting va biz siz bilan bog'lanamiz
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      className="w-full border-2 border-slate-100 focus:border-[#2563EB] bg-slate-50 focus:bg-white p-4 rounded-xl outline-none transition-all duration-200 placeholder-slate-400 text-[#0F172A] text-sm"
                      placeholder="Ismingiz va familiyangiz"
                      required
                    />
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className="w-full border-2 border-slate-100 focus:border-[#2563EB] bg-slate-50 focus:bg-white p-4 rounded-xl outline-none transition-all duration-200 placeholder-slate-400 text-[#0F172A] text-sm"
                      placeholder="Telefon raqamingiz"
                      required
                    />
                    {status === "error" && (
                      <p className="text-red-500 text-xs">
                        Xatolik yuz berdi. Qaytadan urinib ko'ring.
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full bg-[#F97316] hover:bg-[#EA6C0A] disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-colors duration-200 text-sm"
                    >
                      {status === "sending" ? "Yuborilmoqda..." : "Yuborish →"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
