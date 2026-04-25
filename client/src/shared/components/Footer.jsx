import image1 from "../assets/logowhite.svg";
import { Link } from "react-router-dom";
import { InstagramLogo, PhoneCall, TelegramLogo } from "@phosphor-icons/react";

export const Footer = () => {
  return (
    <footer className="bg-[#0F172A]">
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">

          <div className="flex flex-col gap-6">
            <Link to="/">
              <img src={image1} alt="UITC" className="h-20 w-auto" />
            </Link>
            <a href="tel:+998906900048"
              className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center group-hover:bg-[#2563EB] transition-colors duration-200">
                <PhoneCall size={18} color="white" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">+998 90 690 00 48</div>
                <div className="text-slate-500 text-xs mt-0.5">+998 99 974 00 01</div>
              </div>
            </a>
            <div className="flex gap-2">
              <a href="https://www.instagram.com/uitcuz" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center hover:bg-[#2563EB] transition-colors duration-200">
                <InstagramLogo size={18} color="white" />
              </a>
              <a href="https://t.me/uitc_uz" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center hover:bg-[#2563EB] transition-colors duration-200">
                <TelegramLogo size={18} color="white" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-white font-bold mb-5 text-sm">Tez havolalar</p>
            <ul className="space-y-3">
              {[
                { to: "/services", label: "Xizmatlar", link: true },
                { to: "/courses", label: "Kurslar", link: true },
                { to: "/#our-projects", label: "Loyihalar", link: false },
                { to: "/#features", label: "Afzalliklarimiz", link: false },
                { to: "/#booking", label: "Ro'yxatdan o'tish", link: false },
              ].map((item) => (
                <li key={item.to}>
                  {item.link ? (
                    <Link to={item.to} className="text-slate-400 hover:text-white text-sm transition-colors duration-200">{item.label}</Link>
                  ) : (
                    <a href={item.to} className="text-slate-400 hover:text-white text-sm transition-colors duration-200">{item.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-bold mb-5 text-sm">Bizning manzil</p>
            <div className="rounded-xl overflow-hidden border border-white/8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d188.21297615113187!2d71.60478401803488!3d40.99445063014272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb4bfec6552db7%3A0x79e96c1dd15fef2d!2sUnited%20IT%20Clubs!5e0!3m2!1sru!2s!4v1722167918923!5m2!1sru!2s"
                height="220" width="100%" allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" className="rounded-xl" />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} United IT Clubs. Barcha huquqlar himoyalangan.</p>
          <p className="text-slate-600 text-xs">Zamonaviy texnologiyalar va professional ta'lim</p>
        </div>
      </div>
    </footer>
  );
};
