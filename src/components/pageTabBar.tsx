import React from "react";

interface PageTabBarProps {
  tabs: string[];
  activeIndex: number;
  onChange: (index: number) => void;
}

const PageTabBar: React.FC<PageTabBarProps> = ({
  tabs,
  activeIndex,
  onChange,
}) => {
  return (
    <div className="flex mt-5 border-b justify-between">
      <div className="flex items-center space-x-2">
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => onChange(i)}
            className={`px-4 py-2 font-medium m-0 mb-0 border-b-2 border-0 outline-0 rounded-none focus:outline-none ${
              activeIndex === i ? "border-primary" : "border-transparent"
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
