import React from "react";

export const TabName = {
  VIEW: "View",
  ADD: "Add",
  EDIT: "Edit",
  DETAILS: "Details",
  EDIT_PERMISSIONS: "Edit Permissions",
} as const;

interface PageTabBarProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

const PageTabBar: React.FC<PageTabBarProps> = ({
  tabs,
  activeTab,
  onChange,
}) => {
  return (
    <div className="flex mt-5 border-b justify-between">
      <div className="flex items-center space-x-2">
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={`px-4 py-2 font-medium m-0 mb-0 border-b-2 border-0 outline-0 rounded-none focus:outline-none ${
              activeTab === t ? "border-primary" : "border-transparent"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <p className="text-red-500 text-sm mt-1">* Indicates Mandatory</p>
    </div>
  );
};

export default PageTabBar;
