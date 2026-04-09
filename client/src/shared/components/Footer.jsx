import image1 from "../assets/logowhite.svg";
import { Link } from "react-router-dom";
import { InstagramLogo, PhoneCall, TelegramLogo } from "@phosphor-icons/react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-800 to-[#5d75a5]">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link to="/">
              <img
                src={image1}
                alt="UITC"
                className="h-24 hover:scale-105 transition-transform duration-300"
              />
            </Link>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-all duration-300">
              <a className="text-white flex items-center gap-3" href="tel:+998906900048">
                <div className="p-2 bg-white/20 rounded-lg">
                  <PhoneCall size={22} color="white" />
                </div>
                <div className="text-sm">
                  <div className="font-medium">+998 90 690 00 48</div>
                  <div className="opacity-80">+998 99 974 00 01</div>
                </div>
              </a>
            </div>

            <div className="flex gap-3">
              <a
                className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/uitcuz"
              >
                <InstagramLogo size={22} color="white" />
              </a>
              <a
                className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
                href="https://t.me/uitc_uz"
              >
                <TelegramLogo size={22} color="white" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-5">Tez havolalar</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/services" className="text-white/80 hover:text-white transition-colors text-sm font-medium hover:translate-x-1 inline-block">
                  Xizmatlar
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-white/80 hover:text-white transition-colors text-sm font-medium hover:translate-x-1 inline-block">
                  Kurslar
                </Link>
              </li>
              <li>
                <a href="/#our-projects" className="text-white/80 hover:text-white transition-colors text-sm font-medium hover:translate-x-1 inline-block">
                  Loyihalar
                </a>
              </li>
              <li>
                <a href="/#features" className="text-white/80 hover:text-white transition-colors text-sm font-medium hover:translate-x-1 inline-block">
                  Afzalliklarimiz
                </a>
              </li>
              <li>
                <a href="/#booking" className="text-white/80 hover:text-white transition-colors text-sm font-medium hover:translate-x-1 inline-block">
                  Ro'yxatdan o'tish
                </a>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-lg font-bold text-white mb-5">Bizning manzil</h3>
            <div className="bg-white/10 rounded-xl p-2 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d188.21297615113187!2d71.60478401803488!3d40.99445063014272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb4bfec6552db7%3A0x79e96c1dd15fef2d!2sUnited%20IT%20Clubs!5e0!3m2!1sru!2s!4v1722167918923!5m2!1sru!2s"
                height="240"
                width="100%"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/15">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-white/70 text-sm">
              &copy; {new Date().getFullYear()} United IT Clubs. Barcha huquqlar himoyalangan.
            </p>
            <p className="text-white/50 text-xs">
              Zamonaviy texnologiyalar va professional ta'lim
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
