"use client";

import { memo, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";

import {
  LayoutDashboard,
  Globe,
  MapPin,
  Mountain,
  Layers,
  Briefcase,
  Timer,
  Tags,
  MenuSquare,
  ClipboardList,
  Info,
  Star,
  FileText,
  CarTaxiFront,
  Users,
} from "lucide-react";

import RoutesPath from "../routes/routesPath";
import { IMAGES } from "../theme/images";
import { useAuthStore } from "../store/authStore";

interface SideNavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: (open?: boolean) => void;
  currentPath: string;
}

const SideNavbar = ({
  isSidebarOpen,
  toggleSidebar,
  currentPath,
}: SideNavbarProps) => {
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const menuAccess = useAuthStore((s) => s.menuAccess);
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

  /* ---------------- MENU CONFIG ---------------- */
  const menus = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={16} />,
      show: true,
      route: RoutesPath.dashboard,
    },
    {
      name: "Manage Location",
      icon: <Globe size={16} />,
      show: false,
      module: "manageLocation",
      subMenu: [
        {
          name: "Destination",
          route: RoutesPath.destination,
          icon: <MapPin size={16} />,
          show: false,
        },
        {
          name: "Activity",
          route: RoutesPath.activity,
          icon: <Mountain size={16} />,
          show: false,
        },
        {
          name: "Category",
          route: RoutesPath.category,
          icon: <Layers size={16} />,
          show: false,
        },
      ],
    },
    {
      name: "Manage Package",
      icon: <Briefcase size={16} />,
      show: false,
      module: "managePackage",
      subMenu: [
        {
          name: "Package Duration",
          route: RoutesPath.packageDuration,
          icon: <Timer size={16} />,
          show: false,
        },
        {
          name: "Package Type",
          route: RoutesPath.packageType,
          icon: <Layers size={16} />,
          show: false,
        },
        {
          name: "Tags",
          route: RoutesPath.tags,
          icon: <Tags size={16} />,
          show: false,
        },
        {
          name: "Tour Package",
          route: RoutesPath.tourPackage,
          icon: <Briefcase size={16} />,
          show: false,
        },
        {
          name: "Menu",
          route: RoutesPath.topLevelMenu,
          icon: <MenuSquare size={16} />,
          show: false,
        },
      ],
    },
    {
      name: "Manage Bookings",
      icon: <ClipboardList size={16} />,
      show: false,
      module: "manageBookings",
      subMenu: [
        {
          name: "User Itinerary",
          route: RoutesPath.userItinerary,
          icon: <FileText size={16} />,
          show: false,
        },
      ],
    },
    {
      name: "Vehicles",
      icon: <CarTaxiFront size={16} />,
      show: false,
      route: RoutesPath.vehicle,
    },
    {
      name: "Users",
      icon: <Users size={16} />,
      show: false,
      module: "users",
      route: RoutesPath.users,
    },
    {
      name: "CMS",
      icon: <Info size={16} />,
      show: false,
      route: RoutesPath.cms,
    },
    {
      name: "Reviews",
      icon: <Star size={16} />,
      show: false,
      route: RoutesPath.reviews,
    },
    {
      name: "Blogs",
      icon: <FileText size={16} />,
      show: false,
      route: RoutesPath.blogs,
    },
  ];

  const hasModuleAccess = (module?: string) => {
    if (!module) return true; // menus without module are always visible
    return menuAccess?.some((m: any) => m.module === module);
  };

  /* ---------------- ACTIVE HELPERS ---------------- */
  const isSubMenuActive = (menu: any) =>
    menu.subMenu?.some((sub: any) => currentPath.includes(sub.route));

  const isMainMenuActive = (menu: any) =>
    !!menu.route &&
    (currentPath === menu.route || currentPath.includes(menu.route));

  /* ---------------- AUTO EXPAND ACTIVE MENU ---------------- */
  useEffect(() => {
    const openMenus = new Set<string>();

    menus.forEach((menu) => {
      if (menu.subMenu?.some((s) => currentPath.includes(s.route))) {
        openMenus.add(menu.name);
      }
    });

    setExpandedMenus(openMenus);
  }, [currentPath]);

  return (
    <aside
      ref={sidebarRef}
      className={`fixed md:static z-40 w-64 h-full bg-primary text-white transition-transform
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }
      `}
    >
      {/* ---------- LOGO ---------- */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#1f4d5a] relative">
        <img
          src={IMAGES.logo}
          alt="Logo"
          className="w-40 object-contain mx-auto"
        />

        <button
          className="md:hidden absolute right-4"
          onClick={() => toggleSidebar(false)}
        >
          <FaTimes size={18} />
        </button>
      </div>

      {/* ---------- MENU ---------- */}
      <nav className="mt-2">
        {menus
          .filter((menu) => hasModuleAccess(menu.module))
          .map((menu) => {
            const activeMain = isMainMenuActive(menu) || isSubMenuActive(menu);

            return (
              <div key={menu.name} className="">
                {/* -------- MAIN MENU -------- */}
                <div
                  className={`flex items-center justify-between px-5 py-4 cursor-pointer transition-colors
                  ${
                    activeMain
                      ? "bg-[#1f4d5a] text-orange-400"
                      : "hover:bg-[#1a4350]"
                  }
                `}
                  onClick={() => {
                    if (menu.subMenu) {
                      setExpandedMenus((prev) =>
                        prev.has(menu.name)
                          ? new Set([...prev].filter((m) => m !== menu.name))
                          : new Set(prev).add(menu.name)
                      );
                    } else if (menu.route) {
                      navigate(menu.route);
                      toggleSidebar(false);
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    {menu.icon}
                    <span className="text-sm font-medium">{menu.name}</span>
                  </div>

                  {menu.subMenu &&
                    (expandedMenus.has(menu.name) ? (
                      <FaChevronUp size={12} />
                    ) : (
                      <FaChevronDown size={12} />
                    ))}
                </div>

                {/* -------- SUB MENU -------- */}
                {expandedMenus.has(menu.name) &&
                  menu.subMenu?.map((sub) => (
                    <Link
                      key={sub.route}
                      to={sub.route}
                      onClick={() => toggleSidebar(false)}
                      className={`block pl-10 py-4 text-sm transition-colors
                      ${
                        currentPath.includes(sub.route)
                          ? "bg-[#173d47] text-orange-400 hover:text-orange-200"
                          : "hover:bg-[#1a4350] text-gray-300 hover:text-gray-50"
                      }
                    `}
                    >
                      <span className="flex items-center gap-2 text-sm ">
                        {sub.icon}
                        {sub.name}
                      </span>
                    </Link>
                  ))}
              </div>
            );
          })}
      </nav>
    </aside>
  );
};

export default memo(SideNavbar);
