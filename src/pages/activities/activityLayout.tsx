import { useEffect, useState } from "react";
import PageTabBar from "../../components/pageTabBar";
import AddActivityForm from "./addActivityForm";
import TableList from "./tableView";
import EditActivityForm from "./editActivityForm";
import { useEditMgmtStore } from "../../store/editMgmtStore";
import ViewDetails from "./viewDetails";

const ActivityLayout = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const isEditing = useEditMgmtStore((s) => !!s.editiActivityData);
  const isViewing = useEditMgmtStore((s) => !!s.viewActivityData);

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
        {tabIndex === 0 &&
          (isEditing ? <EditActivityForm /> : <AddActivityForm />)}

        {tabIndex === 1 && <TableList />}

        {tabIndex === 2 && isViewing && <ViewDetails />}
      </div>
    </div>
  );
};

export default ActivityLayout;
