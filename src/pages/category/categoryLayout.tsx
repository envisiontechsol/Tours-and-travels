import { useEffect, useMemo, useState } from "react";
import PageTabBar, { TabName } from "../../components/pageTabBar";
import { useEditMgmtStore } from "../../store/editMgmtStore";
import TableList from "./tableView";
import EditForm from "./editForm";
import ViewDetails from "./viewDetails";

const CategoryLayout = () => {
  const [activeTab, setActiveTab] = useState<string>(TabName.VIEW);

  const isEditing = useEditMgmtStore((s) => !!s.editSlotCategoryData);
  const isViewing = useEditMgmtStore((s) => !!s.viewSlotCategoryData);

  const getTabName = (tab: string) => {
    setActiveTab(tab);
  };

  /* ----------------------- TABS ----------------------- */
  const tabs = useMemo(() => {
    return [
      TabName.VIEW,
      ...(isEditing ? [TabName.EDIT] : []),
      ...(isViewing ? [TabName.DETAILS] : []),
    ];
  }, [isEditing, isViewing]);

  /* ------------------ AUTO TAB SWITCH ------------------ */
  useEffect(() => {
    if (isViewing) return getTabName(TabName.DETAILS);
    if (isEditing) return getTabName(TabName.EDIT);
    getTabName(TabName.VIEW);
  }, [isEditing, isViewing, tabs]);

  return (
    <div className="w-full p-6 relative flex flex-col h-full">
      <PageTabBar
        tabs={tabs}
        activeTab={activeTab}
        onChange={(tab) => getTabName(tab)}
      />

      <div className="overflow-y-auto flex flex-1 flex-col py-8 mt-4">
        {activeTab === TabName.VIEW && <TableList />}
        {activeTab === TabName.EDIT && <EditForm />}
        {activeTab === TabName.DETAILS && <ViewDetails />}
      </div>
    </div>
  );
};

export default CategoryLayout;
