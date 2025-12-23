import { memo, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronUp,
  FaGlobeAsia,
  FaHiking,
  FaLayerGroup,
  FaMapMarkedAlt,
  FaSuitcaseRolling,
  FaTachometerAlt,
  FaTags,
  FaTimes,
} from "react-icons/fa";
import { GiDuration } from "react-icons/gi";
import { MdCategory } from "react-icons/md";
import RoutesPath from "../routes/routesPath";
import { IMAGES } from "../theme/images";

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
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

  const menus = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      route: RoutesPath.dashboard,
    },
    {
      name: "Manage Location",
      icon: <FaGlobeAsia />,
      subMenu: [
        {
          name: "Destination",
          route: RoutesPath.destination,
          icon: <FaMapMarkedAlt />,
        },
        { name: "Activity", route: RoutesPath.activity, icon: <FaHiking /> },
        { name: "Category", route: RoutesPath.category, icon: <MdCategory /> },
      ],
    },
    {
      name: "Manage Package",
      icon: <FaSuitcaseRolling />,
      subMenu: [
        {
          name: "Package Duration",
          route: RoutesPath.packageDuration,
          icon: <GiDuration />,
        },
        {
          name: "Package Type",
          route: RoutesPath.packageType,
          icon: <FaLayerGroup />,
        },
        { name: "Tags", route: RoutesPath.tags, icon: <FaTags /> },
        {
          name: "Tour Package",
          route: RoutesPath.tourPackage,
          icon: <FaSuitcaseRolling />,
        },
        {
          name: "User Itinerary",
          route: RoutesPath.userItinerary,
          icon: <FaSuitcaseRolling />,
        },
      ],
    },
    {
      name: "About Us",
      icon: <FaTachometerAlt />,
      route: RoutesPath.aboutEditor,
    },
    {
      name: "Reviews",
      icon: <FaTachometerAlt />,
      route: RoutesPath.reviews,
    },
    {
      name: "Blogs",
      icon: <FaTachometerAlt />,
      route: RoutesPath.blogs,
    },
  ];

  // Auto expand based on route
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
      className={`fixed md:static z-40 w-64 h-full bg-primary text-white transition-transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
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

      <nav>
        {menus.map((menu) => (
          <div key={menu.name}>
            <div
              className="flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-gray-700"
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
              <div className="flex gap-3 items-center">
                {menu.icon}
                <span>{menu.name}</span>
              </div>
              {menu.subMenu &&
                (expandedMenus.has(menu.name) ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                ))}
            </div>

            {expandedMenus.has(menu.name) &&
              menu.subMenu?.map((sub) => (
                <Link
                  key={sub.route}
                  to={sub.route}
                  onClick={() => toggleSidebar(false)}
                  className={`block pl-10 py-2 text-sm ${
                    currentPath.includes(sub.route)
                      ? "bg-gray-800 text-orange-400"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {sub.icon}
                    {sub.name}
                  </span>
                </Link>
              ))}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default memo(SideNavbar);
