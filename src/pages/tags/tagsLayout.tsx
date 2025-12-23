import React, { useEffect, useState } from "react";
import PageTabBar from "../../components/pageTabBar";
import AddTagForm from "./addForm";
import TableList from "./tableView";
import EditTagForm from "./editForm";
import { useEditMgmtStore } from "../../store/editMgmtStore";
import ViewDetails from "./viewDetails";

const TagsLayout = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const isEditing = useEditMgmtStore((s) => !!s.editTagData);

  const isViewing = useEditMgmtStore((s) => !!s.viewTagData);

  useEffect(() => {
    if (isEditing) return setTabIndex(0);
    if (isViewing) return setTabIndex(2);
    setTabIndex(1);
  }, [isEditing, isViewing]);

  const tabs = [
    ...(isEditing ? ["Edit"] : ["Add"]),
    "View",
    ...(isViewing ? ["Details"] : []),
  ];
  return (
    <div className="w-full p-6 relative flex flex-col h-full">
      <PageTabBar
        tabs={tabs}
        activeIndex={tabIndex}
        onChange={(idx) => setTabIndex(idx)}
      />

      <div className="overflow-y-auto relative flex flex-1 flex-col py-8 mt-4">
        {tabIndex === 0 ? isEditing ? <EditTagForm /> : <AddTagForm /> : null}
        {tabIndex === 1 && <TableList />}
        {tabIndex === 2 && isViewing && <ViewDetails />}
      </div>
    </div>
  );
};

export default TagsLayout;
