import { useEffect, useState } from "react";
import PageTabBar from "../../components/pageTabBar";
import { useEditMgmtStore } from "../../store/editMgmtStore";
import AddPackageTypeForm from "./addForm";
import EditPackageTypeForm from "./editForm";
import PackageTypeTable from "./tableView";
import ViewDetails from "./viewDetails";

const PackageTypeLayout = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const isEditing = useEditMgmtStore((s) => !!s.editiPackageTypeData);
  const isViewing = useEditMgmtStore((s) => !!s.viewPackageTypeData);

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
        {tabIndex === 0 ? (
          isEditing ? (
            <EditPackageTypeForm />
          ) : (
            <AddPackageTypeForm />
          )
        ) : null}
        {tabIndex === 1 && <PackageTypeTable />}
        {tabIndex === 2 && isViewing && <ViewDetails />}
      </div>
    </div>
  );
};

export default PackageTypeLayout;
