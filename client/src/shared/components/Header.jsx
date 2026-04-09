import { useState, useEffect, useRef } from "react";
import { List, X } from "@phosphor-icons/react";
import Logo from "../assets/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { to: "/services", label: "Xizmatlar" },
  { to: "/courses", label: "Kurslar" },
  { to: "/#our-projects", label: "Loyihalar" },
  { to: "/#booking", label: "Ro'yxatdan o'tish" },
];

export const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prevScrollYRef = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > prevScrollYRef.current && currentScrollY > 80) {
        setShowHeader(false);
        setMobileOpen(false);
      } else {
        setShowHeader(true);
      }
      setScrollY(currentScrollY);
      prevScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHashClick = (e, to) => {
    e.preventDefault();
    setMobileOpen(false);
    const hash = to.split("#")[1];

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`sticky w-full left-0 top-0 z-50 transition-all duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      } ${
        scrollY > 50
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex-shrink-0">
          <img src={Logo} alt="UITC" className="h-12 md:h-14" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.to.includes("#") ? (
              <a
                key={link.to}
                href={link.to}
                onClick={(e) => handleHashClick(e, link.to)}
                className="text-[#5d75a5] font-semibold text-sm hover:text-[#55b8ff] transition-colors duration-200"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className="text-[#5d75a5] font-semibold text-sm hover:text-[#55b8ff] transition-colors duration-200"
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href="tel:+998906900048"
            className="flex items-center gap-2 text-white bg-gradient-to-r from-[#55B8FF] to-[#5D75A5] hover:from-[#5D75A5] hover:to-[#55B8FF] transition-all duration-300 font-semibold text-sm py-2.5 px-5 rounded-full shadow-md hover:shadow-lg"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>+998 90 690 00 48</span>
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#5d75a5]"
        >
          {mobileOpen ? (
            <X size={28} weight="bold" />
          ) : (
            <List size={28} weight="bold" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 pb-5">
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) =>
              link.to.includes("#") ? (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={(e) => handleHashClick(e, link.to)}
                  className="text-[#5d75a5] font-semibold py-3 px-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-[#5d75a5] font-semibold py-3 px-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
            <a
              href="tel:+998906900048"
              className="mt-2 flex items-center justify-center gap-2 text-white bg-gradient-to-r from-[#55B8FF] to-[#5D75A5] font-semibold text-sm py-3 px-5 rounded-full"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +998 90 690 00 48
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
