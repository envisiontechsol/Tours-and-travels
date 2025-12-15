import React, { useEffect, useState } from "react";
import PageTabBar from "../../components/pageTabBar";

import { useEditMgmtStore } from "../../store/editMgmtStore";
import TableList from "./tableView";
import EditForm from "./editForm";

const CategoryLayout = () => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const isEditing = useEditMgmtStore((s) => !!s.editSlotCategoryData);

  useEffect(() => {
    if (isEditing) {
      setTabIndex(1);
    } else {
      setTabIndex(0);
    }
  }, [isEditing]);

  return (
    <div className="w-full p-6  relative  flex flex-col h-full">
      <PageTabBar
        tabs={["View", ...(isEditing ? ["Edit"] : [])]}
        activeIndex={tabIndex}
        onChange={setTabIndex}
      />
      <div className="overflow-y-auto relative flex flex-1 flex-col py-8 mt-4">
        {tabIndex === 1 && isEditing && <EditForm />}
        {tabIndex === 0 && <TableList />}
      </div>
    </div>
  );
};

export default CategoryLayout;
