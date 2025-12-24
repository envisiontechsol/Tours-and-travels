import { useEffect, useState } from "react";
import PageTabBar from "../../components/pageTabBar";
import TableView from "./tableView";
import { useEditMgmtStore } from "../../store/editMgmtStore";
import ViewDetails from "./viewDetails";

const UserItineraryLayout = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const isViewing = useEditMgmtStore((s) => !!s.viewUserItineraryData);

  useEffect(() => {
    if (isViewing) return setTabIndex(1);
    setTabIndex(0);
  }, [isViewing]);

  const tabs = ["View", ...(isViewing ? ["Details"] : [])];

  return (
    <div className="w-full p-6 relative flex flex-col h-full">
      <PageTabBar
        tabs={tabs}
        activeIndex={tabIndex}
        onChange={(idx) => setTabIndex(idx)}
      />

      <div className="overflow-y-auto relative flex flex-1 flex-col py-8 mt-4">
        {tabIndex === 0 && <TableView />}
        {tabIndex === 1 && isViewing && <ViewDetails />}
      </div>
    </div>
  );
};

export default UserItineraryLayout;
