import { useEffect, useMemo, useState } from "react";
import PageTabBar, { TabName } from "../../components/pageTabBar";
import { useEditMgmtStore } from "../../store/editMgmtStore";
import AddActivityForm from "./addActivityForm";
import EditActivityForm from "./editActivityForm";
import TableList from "./tableView";
import ViewDetails from "./viewDetails";

const ActivityLayout = () => {
  const [activeTab, setActiveTab] = useState<string>(TabName.VIEW);

  const isEditing = useEditMgmtStore((s) => !!s.editiActivityData);
  const isViewing = useEditMgmtStore((s) => !!s.viewActivityData);

  const getTabName = (tab: string) => {
    setActiveTab(tab);
  };

  /* ----------------------- TABS ----------------------- */
  const tabs = useMemo(() => {
    return [
      TabName.VIEW,
      isEditing ? TabName.EDIT : TabName.ADD,
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

      <div className="overflow-y-auto relative flex flex-1 flex-col py-8 mt-4">
        {activeTab === TabName.VIEW && <TableList />}

        {activeTab === TabName.ADD && <AddActivityForm />}

        {activeTab === TabName.EDIT && <EditActivityForm />}

        {activeTab === TabName.DETAILS && <ViewDetails />}
      </div>
    </div>
  );
};

export default ActivityLayout;
