import { useEffect, useState } from "react";
import PageTabBar from "../../components/pageTabBar";
import { useEditMgmtStore } from "../../store/editMgmtStore";
import AddPackageTypeForm from "./addForm";
import EditPackageTypeForm from "./editForm";
import PackageTypeTable from "./tableView";

const PackageTypeLayout = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const isEditing = useEditMgmtStore((s) => !!s.editiPackageTypeData);

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
            <EditPackageTypeForm />
          ) : (
            <AddPackageTypeForm />
          )
        ) : null}
        {tabIndex === 1 && <PackageTypeTable />}
      </div>
    </div>
  );
};

export default PackageTypeLayout;
