import React, { useEffect, useState } from "react";
import PageTabBar from "../../components/pageTabBar";
import AddTagForm from "./addForm";
import TableList from "./tableView";
import EditTagForm from "./editForm";
import { useEditMgmtStore } from "../../store/editMgmtStore";

const TagsLayout = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const isEditing = useEditMgmtStore((s) => !!s.editTagData);

  useEffect(() => {
    if (isEditing) {
      setTabIndex(0);
    }
  }, [isEditing]);

  return (
    <div className="w-full p-6  relative  flex flex-col h-full">
      <PageTabBar
        tabs={[...(isEditing ? ["Edit"] : ["Add"]), "View"]}
        activeIndex={tabIndex}
        onChange={setTabIndex}
      />
      <div className="overflow-y-auto relative flex flex-1 flex-col py-8 mt-4">
        {tabIndex === 0 ? isEditing ? <EditTagForm /> : <AddTagForm /> : null}
        {tabIndex === 1 && <TableList />}
      </div>
    </div>
  );
};

export default TagsLayout;
