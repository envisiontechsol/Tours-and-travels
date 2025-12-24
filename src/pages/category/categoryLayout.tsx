import React, { useEffect, useState } from "react";
import PageTabBar from "../../components/pageTabBar";

import { useEditMgmtStore } from "../../store/editMgmtStore";
import TableList from "./tableView";
import EditForm from "./editForm";
import ViewDetails from "./viewDetails";

const CategoryLayout = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const isEditing = useEditMgmtStore((s) => !!s.editSlotCategoryData);
  const isViewing = useEditMgmtStore((s) => !!s.viewSlotCategoryData);

  const tabs = [
    "View",
    ...(isEditing ? ["Edit"] : []),
    ...(isViewing ? ["Details"] : []),
  ];

  useEffect(() => {
    if (isEditing) {
      setTabIndex(tabs.indexOf("Edit"));
    } else if (isViewing) {
      setTabIndex(tabs.indexOf("Details"));
    } else {
      setTabIndex(tabs.indexOf("View"));
    }
  }, [isEditing, isViewing]);

  return (
    <div className="w-full p-6 relative flex flex-col h-full">
      <PageTabBar tabs={tabs} activeIndex={tabIndex} onChange={setTabIndex} />

      <div className="overflow-y-auto flex flex-1 flex-col py-8 mt-4">
        {tabs[tabIndex] === "View" && <TableList />}
        {tabs[tabIndex] === "Edit" && <EditForm />}
        {tabs[tabIndex] === "Details" && <ViewDetails />}
      </div>
    </div>
  );
};

export default CategoryLayout;
