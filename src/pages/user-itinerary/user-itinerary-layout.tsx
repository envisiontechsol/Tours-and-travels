import { useState } from "react";
import PageTabBar from "../../components/pageTabBar";
import TableView from "./tableView";

const UserItineraryLayout = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const tabs = ["View"];
  return (
    <div className="w-full p-6 relative flex flex-col h-full">
      <PageTabBar
        tabs={tabs}
        activeIndex={tabIndex}
        onChange={(idx) => setTabIndex(idx)}
      />

      <div className="overflow-y-auto relative flex flex-1 flex-col py-8 mt-4">
        {tabIndex === 0 && <TableView />}
        {/* {tabIndex === 2 && isViewing && <ViewDetails />} */}
      </div>
    </div>
  );
};

export default UserItineraryLayout;
