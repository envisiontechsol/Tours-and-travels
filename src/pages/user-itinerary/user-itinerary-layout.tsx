import { useEffect, useMemo, useState } from "react";
import PageTabBar, { TabName } from "../../components/pageTabBar";
import { useEditMgmtStore } from "../../store/editMgmtStore";
import TableView from "./tableView";
import ViewDetails from "./viewDetails";

const UserItineraryLayout = () => {
  const [activeTab, setActiveTab] = useState<string>(TabName.VIEW);

  const isViewing = useEditMgmtStore((s) => !!s.viewUserItineraryData);

  const getTabName = (tab: string) => {
    setActiveTab(tab);
  };

  /* ----------------------- TABS ----------------------- */
  const tabs = useMemo(() => {
    return [TabName.VIEW, ...(isViewing ? [TabName.DETAILS] : [])];
  }, [isViewing]);

  /* ------------------ AUTO TAB SWITCH ------------------ */
  useEffect(() => {
    if (isViewing) return getTabName(TabName.DETAILS);
    getTabName(TabName.VIEW);
  }, [isViewing, tabs]);

  return (
    <div className="w-full p-6 relative flex flex-col h-full">
      <PageTabBar
        tabs={tabs}
        activeTab={activeTab}
        onChange={(tab) => getTabName(tab)}
      />

      <div className="overflow-y-auto relative flex flex-1 flex-col py-8 mt-4">
        {activeTab === TabName.VIEW && <TableView />}
        {activeTab === TabName.DETAILS && <ViewDetails />}
      </div>
    </div>
  );
};

export default UserItineraryLayout;
