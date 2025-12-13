import { useCallback, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardHeader from "../components/header";
import SideNavbar from "../components/sideNavbar";

export const AdminLayout = () => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const handleMenuClick = useCallback((menuName: string) => {
    setActiveMenu(menuName);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <SideNavbar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activeMenu={activeMenu}
        handleMenuClick={handleMenuClick}
      />
      <main className="flex-1 overflow-y-auto bg-primary p-4">
        <div className="bg-white h-full w-full rounded-xl overflow-hidden">
          <DashboardHeader title={activeMenu} toggleSidebar={toggleSidebar} />
          <div className="container h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
