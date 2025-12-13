import { memo, useEffect, useRef, useState } from "react";
import { FaBars, FaSortDown } from "react-icons/fa";
import { GiPowerButton } from "react-icons/gi";
import { HiOutlineUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  toggleSidebar: () => void;
  title: string;
}

const DashboardHeader = ({ toggleSidebar, title }: DashboardHeaderProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationIconRef = useRef<HTMLButtonElement>(null);
  const profileIconRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    navigate("/");
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationIconRef.current &&
        notificationIconRef.current.contains(event.target as Node)
      ) {
        return;
      }
      if (
        profileIconRef.current &&
        profileIconRef.current.contains(event.target as Node)
      ) {
        return;
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <button className="md:hidden text-gray-600" onClick={toggleSidebar}>
          <FaBars className="w-6 h-6" />
        </button>

        <h1 className="text-[20px] font-semibold text-gray-900">{title}</h1>

        <div className="flex items-center space-x-4 relative">
          <div className="relative"></div>

          <div className="relative">
            <div
              ref={profileIconRef}
              className="rounded-full flex items-center justify-center cursor-pointer"
              onClick={toggleProfileDropdown}
            >
              <HiOutlineUser size={17} className="text-gray-500" />
              <FaSortDown size={15} className="mb-2" />
            </div>

            {isProfileOpen && (
              <div
                ref={profileRef}
                className="absolute right-0 top-10 bg-white shadow-md rounded-lg py-2 w-48 z-10 border"
              >
                <ul className="space-y-2">
                  <li
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <GiPowerButton className="mr-2 text-gray-600" size={18} />
                    <span className="text-[14px] font-[500] text-[#333333]">
                      Logout
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <ProfileModal
        isVisible={isProfileModalVisible}
        onClose={() => setIsProfileModalVisible(false)}
      /> */}
    </header>
  );
};

export default memo(DashboardHeader);
