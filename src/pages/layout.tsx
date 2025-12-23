import { useState, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideNavbar from "../components/sideNavbar";
import DashboardHeader from "../components/header";
import routeTitles from "../routes/routeTitles";

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = (open?: boolean) => {
    setIsSidebarOpen(open ?? !isSidebarOpen);
  };

  const activeTitle = useMemo(() => {
    return routeTitles[location.pathname] || "Dashboard";
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        currentPath={location.pathname}
      />

      <main className="flex-1 overflow-y-auto">
        <div className="bg-white h-full rounded-xl">
          <DashboardHeader title={activeTitle} toggleSidebar={toggleSidebar} />

          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
