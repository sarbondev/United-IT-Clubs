import { useState } from "react";
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from "../lib/config";
import BookingSvg from "../assets/booking/1.svg";

export const Booking = () => {
  const [status, setStatus] = useState("idle");

  const [formData, setFormData] = useState({
    fullname: "",
    contact: "",
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="booking" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#55b8ff] via-[#9AD2FB] to-[#EFF6FF]" />

      <div className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-2xl grid grid-cols-1 lg:grid-cols-2 p-8 lg:p-14 gap-10 rounded-3xl">
            <div className="flex flex-col gap-6 justify-center items-center text-center">
              <div className="space-y-3">
                <h2 className="text-3xl lg:text-4xl font-bold text-[#5d75a5]">
                  Bizga qo'shiling!
                </h2>
                <p className="text-[#5d75a5]/70 text-lg">
                  Kelajakni biz bilan birga quring
                </p>
              </div>
              <img
                src={BookingSvg}
                alt="Students learning"
                className="w-56 h-56 lg:w-72 lg:h-72 object-contain drop-shadow-lg"
              />
            </div>

            {status === "success" ? (
              <div className="flex flex-col justify-center items-center gap-3 py-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
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
                <p className="text-[#5d75a5] font-semibold">
                  Muvaffaqiyatli yuborildi!
                </p>
                <p className="text-[#5d75a5]/60 text-sm">
                  Tez orada siz bilan bog'lanamiz
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center gap-6"
              >
                <div className="text-center space-y-1">
                  <h3 className="text-xl font-semibold text-[#5d75a5]">
                    Ro'yxatdan o'ting
                  </h3>
                  <p className="text-[#5d75a5]/60 text-sm">
                    Ma'lumotlaringizni kiriting va biz siz bilan bog'lanamiz
                  </p>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full bg-white/60 backdrop-blur-sm border border-white/30 shadow-sm p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#55b8ff] transition-all duration-300 placeholder-[#5d75a5]/50"
                    placeholder="Ismingiz va familiyangiz"
                    required
                  />

                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full bg-white/60 backdrop-blur-sm border border-white/30 shadow-sm p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#55b8ff] transition-all duration-300 placeholder-[#5d75a5]/50"
                    placeholder="Telefon raqamingiz"
                    required
                  />

                  {status === "error" && (
                    <p className="text-red-500 text-sm text-center">
                      Xatolik yuz berdi. Qaytadan urinib ko'ring.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-gradient-to-r from-[#55b8ff] to-[#5d75a5] hover:from-[#5d75a5] hover:to-[#55b8ff] text-white font-semibold text-lg py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60"
                  >
                    {status === "sending" ? "Yuborilmoqda..." : "Yuborish"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
