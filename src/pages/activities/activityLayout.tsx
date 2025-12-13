import { useEffect, useState } from "react";
import PageTabBar from "../../components/pageTabBar";
import AddActivityForm from "./addActivityForm";
import TableList from "./tableView";
import { useEditMgmtStore } from "../../store/editMgmtStore";
import EditActivityForm from "./editActivityForm";

const ActivityLayout = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const isEditing = useEditMgmtStore((s) => !!s.editiActivityData);

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
        {tabIndex === 0 ? (
          isEditing ? (
            <EditActivityForm />
          ) : (
            <AddActivityForm />
          )
        ) : null}
        {tabIndex === 1 && <TableList />}
      </div>
    </div>
  );
};

export default ActivityLayout;
