import { NavLink } from "react-router-dom";
import {
  BookOpen,
  Briefcase,
  Wrench,
  Users,
  ShieldCheck,
  SignOut,
} from "@phosphor-icons/react";

const navLinks = [
  { to: "/courses", title: "Kurslar", icon: BookOpen },
  { to: "/projects", title: "Loyihalar", icon: Briefcase },
  { to: "/services", title: "Xizmatlar", icon: Wrench },
  { to: "/staffs", title: "Xodimlar", icon: Users },
  { to: "/admins", title: "Adminlar", icon: ShieldCheck },
];

export const Sidebar = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <aside className="flex flex-col h-screen bg-[#0f172a] text-white">
      {/* Logo / Brand */}
      <div className="px-5 py-6 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-wide">
          <span className="text-[#55b8ff]">UITC</span>{" "}
          <span className="text-white/70 font-medium text-sm">Admin</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navLinks.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#55b8ff] text-white shadow-lg shadow-[#55b8ff]/25"
                  : "text-white/60 hover:text-white hover:bg-white/[0.06]"
              }`
            }
          >
            <item.icon size={20} weight="bold" />
            {item.title}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
        >
          <SignOut size={20} weight="bold" />
          Chiqish
        </button>
      </div>
    </aside>
  );
};
