import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";

export const RootLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <main className="app-shell relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(239,125,50,0.15),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(22,163,74,0.06),_transparent_20%)]" />
      <div className="relative flex min-h-screen">
        <Sidebar
          isOpen={sidebarOpen}
          collapsed={sidebarCollapsed}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar
            onOpenSidebar={() => setSidebarOpen(true)}
            collapsed={sidebarCollapsed}
          />
          <Outlet />
        </div>
      </div>
    </main>
  );
};
