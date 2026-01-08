import React, { useState } from "react";
import AboutEditor from "./aboutUsEditorPage";
import PrivacyPolicyEditor from "./privacyPolicy";
import TermsConditionsEditor from "./termsConditions";

type CMSOption = "about" | "privacy" | "terms";

const tabs: { key: CMSOption; label: string }[] = [
  { key: "about", label: "About Us" },
  { key: "privacy", label: "Privacy Policy" },
  { key: "terms", label: "Terms & Conditions" },
];

const CMSPage = () => {
  const [activeTab, setActiveTab] = useState<CMSOption>("about");

  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return <AboutEditor />;
      case "privacy":
        return <PrivacyPolicyEditor />;
      case "terms":
        return <TermsConditionsEditor />;
      default:
        return null;
    }
  };

  return (
    <div className="">
      <div className=" ">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 text-sm font-medium transition-all
                ${
                  activeTab === tab.key
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="">{renderContent()}</div>
      </div>
    </div>
  );
};

export default CMSPage;
