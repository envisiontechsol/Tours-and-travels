import React, { memo, useEffect, useRef, useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaTachometerAlt,
  FaTimes,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { IMAGES } from "../theme/images";

import {
  FaClock,
  FaGlobeAsia,
  FaListUl,
  FaMapMarkerAlt,
  FaSuitcaseRolling,
} from "react-icons/fa";
import RoutesPath from "../routes/routesPath";
import { Tag } from "lucide-react";

interface SubMenuItem {
  name: string;
  route: string;
  icon?: JSX.Element;
  headerLabel?: string;
}

interface MenuItem {
  name: string;
  icon: JSX.Element;
  route: string | null;
  headerLabel?: string;
  subMenu?: SubMenuItem[];
}

interface SideNavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: (isOpen: boolean) => void;
  activeMenu: string;
  handleMenuClick: (menuName: string) => void;
}

const SideNavbar: React.FC<SideNavbarProps> = ({
  isSidebarOpen,
  toggleSidebar,
  activeMenu,
  handleMenuClick,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
  const location = useLocation();

  const menus: MenuItem[] = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt size={18} />,
      route: RoutesPath.adminDashboard,
    },
    {
      name: "Manage Location",
      icon: <FaGlobeAsia size={18} />,
      route: null,
      subMenu: [
        {
          name: "Destinations",
          route: RoutesPath.destination,
          icon: <FaMapMarkerAlt />,
          headerLabel: "Manage Location/Add Destination",
        },
        {
          name: "Activity",
          route: RoutesPath.activity,
          icon: <FaMapMarkerAlt />,
        },
      ],
    },
    {
      name: "Manage Package",
      icon: <FaSuitcaseRolling size={18} />,
      route: null,
      subMenu: [
        {
          name: "Package Duration",
          route: RoutesPath.packageDuration,
          icon: <FaClock />,
        },
        {
          name: "Package Type",
          route: RoutesPath.packageType,
          icon: <FaListUl />,
        },
        {
          name: "Tags",
          route: RoutesPath.tags,
          icon: <Tag size={12} />,
        },
        {
          name: "Tour Package",
          route: RoutesPath.tourPackage,
          icon: <FaSuitcaseRolling />,
        },
      ],
    },
  ];

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        toggleSidebar(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  // Auto open submenu if route matches
  useEffect(() => {
    const newExpandedMenus = new Set(expandedMenus);

    menus.forEach((item) => {
      if (item.subMenu) {
        const shouldExpand = item.subMenu.some((sub) =>
          location.pathname.includes(sub.route)
        );

        if (shouldExpand) {
          newExpandedMenus.add(item.name);
          const activeSub = item.subMenu.find((sub) =>
            location.pathname.includes(sub.route)
          );
          if (activeSub) {
            handleMenuClick(activeSub.headerLabel || activeSub.name);
          }
        }
      }
    });

    setExpandedMenus(newExpandedMenus);
  }, [location.pathname]);

  const toggleMenu = (name: string) => {
    setExpandedMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return newSet;
    });
  };

  const isMenuExpanded = (name: string) => {
    return expandedMenus.has(name);
  };

  return (
    <aside
      ref={sidebarRef}
      className={`fixed md:static z-50 inset-y-0 left-0 w-64 bg-primary text-white transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 ease-in-out md:translate-x-0 border-gray-500`}
    >
      {/* LOGO */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#1f4d5a] relative">
        <img
          src={IMAGES.logo}
          alt="Logo"
          className="w-40 object-contain mx-auto"
        />

        <button
          className="md:hidden text-white absolute right-4"
          onClick={() => toggleSidebar(false)}
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* MENU */}
      <nav className="mt-2">
        {menus.map((item) => (
          <div key={item.name}>
            {/* MAIN MENU ROW */}
            <div
              onClick={() =>
                item.subMenu
                  ? toggleMenu(item.name)
                  : item.route && (window.location.href = item.route)
              }
              className="flex items-center justify-between py-3 px-5 cursor-pointer hover:bg-[#064b5f]"
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-[15px]">{item.name}</span>
              </div>
              {item.subMenu &&
                (isMenuExpanded(item.name) ? (
                  <FaChevronUp size={12} />
                ) : (
                  <FaChevronDown size={12} />
                ))}
            </div>

            {/* SUB MENU */}
            {isMenuExpanded(item.name) &&
              item.subMenu?.map((sub) => (
                <Link
                  key={sub.name}
                  to={sub.route}
                  onClick={() => {
                    handleMenuClick(sub.headerLabel || sub.name);
                    toggleSidebar(false);
                  }}
                  className={`flex items-center gap-3 py-3 pl-10 pr-4 border-l-4 text-sm ${
                    activeMenu === sub.name
                      ? "border-orange-400 text-orange-400 bg-[#0a3c4a]"
                      : "border-transparent text-gray-200 hover:border-orange-300 hover:text-orange-300 hover:bg-[#064b5f]"
                  }`}
                >
                  {sub.icon} {sub.name}
                </Link>
              ))}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default memo(SideNavbar);
