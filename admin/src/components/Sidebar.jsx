import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import {
  BookOpen,
  Briefcase,
  CalendarDots,
  ChatCircleText,
  HouseLine,
  ShieldCheck,
  SignOut,
  UsersThree,
  Wrench,
} from "@phosphor-icons/react";

const navLinks = [
  {
    to: "/dashboard",
    title: "Dashboard",
    icon: HouseLine,
    section: "Overview",
  },
  { to: "/courses", title: "Kurslar", icon: BookOpen, section: "Content" },
  { to: "/projects", title: "Loyihalar", icon: Briefcase, section: "Content" },
  { to: "/services", title: "Xizmatlar", icon: Wrench, section: "Content" },
  { to: "/staffs", title: "Xodimlar", icon: UsersThree, section: "People" },
  {
    to: "/studentFeedbacks",
    title: "O'quvchi Fikrlari",
    icon: ChatCircleText,
    section: "Community",
  },
  {
    to: "/parentFeedbacks",
    title: "Ota-Ona Fikrlari",
    icon: CalendarDots,
    section: "Community",
  },
  { to: "/admins", title: "Adminlar", icon: ShieldCheck, section: "System" },
];

export const Sidebar = ({ isOpen = false, collapsed = false, onClose }) => {
  const handleLogout = useCallback(() => {
    localStorage.clear();
    window.location.href = "/";
  }, []);

  const groupedLinks = navLinks.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`section-card-dark fixed inset-y-3 left-3 z-50 flex w-[300px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-[32px] transition duration-300 md:sticky md:top-4 md:z-20 md:m-4 md:h-[calc(100vh-2rem)] ${
          collapsed ? "md:w-[104px]" : "md:w-[300px]"
        } ${isOpen ? "translate-x-0" : "-translate-x-[110%] md:translate-x-0"}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(239,125,50,0.22),_transparent_30%)] opacity-90" />
        <div className="relative flex h-full flex-col">
          <nav className="relative flex-1 overflow-y-auto px-4 py-6">
            <div className="space-y-6">
              {Object.entries(groupedLinks).map(([section, items]) => (
                <div key={section} className="space-y-2">
                  {!collapsed && (
                    <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                      {section}
                    </p>
                  )}
                  <div className="space-y-1.5">
                    {items.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                          `group relative flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition ${
                            isActive
                              ? "bg-white text-slate-950 shadow-lg shadow-black/10"
                              : "text-slate-300 hover:bg-white/7 hover:text-white"
                          } ${collapsed ? "md:justify-center" : ""}`
                        }
                        title={collapsed ? item.title : undefined}
                      >
                        <item.icon size={20} weight="duotone" />
                        {!collapsed && (
                          <span className="truncate">{item.title}</span>
                        )}
                        {collapsed && (
                          <span className="absolute left-full top-1/2 z-50 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-slate-950 px-3 py-1.5 text-xs font-medium text-white shadow-xl group-hover:block md:block">
                            {item.title}
                          </span>
                        )}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </nav>

          <div className="relative border-t border-white/10 p-4">
            <button
              type="button"
              onClick={handleLogout}
              className={`flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white ${
                collapsed ? "md:justify-center" : ""
              }`}
              title={collapsed ? "Chiqish" : undefined}
            >
              <SignOut size={18} />
              {!collapsed && <span>Chiqish</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
