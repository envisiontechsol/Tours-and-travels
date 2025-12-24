import { useEffect, useState } from "react";
import PageTabBar from "../../components/pageTabBar";
import { useEditMgmtStore } from "../../store/editMgmtStore";
import AddTLMenuForm from "./addForm";
import EditForm from "./editForm";
import TableView from "./tableView";
import ViewDetails from "./viewDetails";

const TopLevelMenuLayout = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const isEditing = useEditMgmtStore((s) => !!s.editTopLeveleMenuData);

  const isViewing = useEditMgmtStore((s) => !!s.viewTopLeveleMenuData);

  useEffect(() => {
    if (isEditing) return setTabIndex(1);
    if (isViewing) return setTabIndex(2);
    setTabIndex(0);
  }, [isEditing, isViewing]);

  const tabs = [
    "View",
    ...(isEditing ? ["Edit"] : ["Add"]),
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
        {tabIndex === 1 ? isEditing ? <EditForm /> : <AddTLMenuForm /> : null}
        {tabIndex === 0 && <TableView />}
        {tabIndex === 2 && isViewing && <ViewDetails />}
      </div>
    </div>
  );
};

export default TopLevelMenuLayout;
