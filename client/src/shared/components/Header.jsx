import { useState, useEffect, useRef } from "react";
import { List, X } from "@phosphor-icons/react";
import Logo from "../assets/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { to: "/services", label: "Xizmatlar" },
  { to: "/courses", label: "Kurslar" },
  { to: "/#our-projects", label: "Loyihalar" },
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
      const y = window.scrollY;
      setShowHeader(y < prevScrollYRef.current || y < 80);
      setScrollY(y);
      if (y > prevScrollYRef.current && y > 80) setMobileOpen(false);
      prevScrollYRef.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHashClick = (e, to) => {
    e.preventDefault();
    setMobileOpen(false);
    const hash = to.split("#")[1];
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }), 300);
    } else {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`sticky w-full top-0 z-50 transition-all duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"} ${scrollY > 50 ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100" : "bg-white/80 backdrop-blur-sm"}`}>
      <div className="container mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between max-w-7xl">
        <Link to="/" className="flex-shrink-0">
          <img src={Logo} alt="UITC" className="h-11 md:h-12" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.to.includes("#") ? (
              <a key={link.to} href={link.to} onClick={(e) => handleHashClick(e, link.to)}
                className="text-slate-600 hover:text-[#2563EB] font-semibold text-sm transition-colors duration-200">
                {link.label}
              </a>
            ) : (
              <Link key={link.to} to={link.to}
                className="text-slate-600 hover:text-[#2563EB] font-semibold text-sm transition-colors duration-200">
                {link.label}
              </Link>
            )
          )}
          <a href="tel:+998906900048"
            className="flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold text-sm py-2.5 px-5 rounded-full transition-colors duration-200">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            +998 90 690 00 48
          </a>
        </nav>

        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-700">
          {mobileOpen ? <X size={26} weight="bold" /> : <List size={26} weight="bold" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pb-5 shadow-lg">
          <nav className="flex flex-col gap-1 pt-3">
            {navLinks.map((link) =>
              link.to.includes("#") ? (
                <a key={link.to} href={link.to} onClick={(e) => handleHashClick(e, link.to)}
                  className="text-slate-700 font-semibold py-3 px-3 rounded-xl hover:bg-slate-50 hover:text-[#2563EB] transition-colors text-sm">
                  {link.label}
                </a>
              ) : (
                <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                  className="text-slate-700 font-semibold py-3 px-3 rounded-xl hover:bg-slate-50 hover:text-[#2563EB] transition-colors text-sm">
                  {link.label}
                </Link>
              )
            )}
            <a href="tel:+998906900048"
              className="mt-2 flex items-center justify-center gap-2 bg-[#F97316] text-white font-semibold text-sm py-3.5 px-5 rounded-xl">
              +998 90 690 00 48
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
