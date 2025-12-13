import { useEffect, useState } from "react";
import PageTabBar from "../../components/pageTabBar";
import TableList from "./tableView";
import AddTourPackageForm from "./addForm";
import { useEditMgmtStore } from "../../store/editMgmtStore";
import EditTourPackageForm from "./editForm";

const TourPackageLayout = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const isEditing = useEditMgmtStore((s) => !!s.editTourPackageData);

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
            <EditTourPackageForm />
          ) : (
            <AddTourPackageForm />
          )
        ) : null}
        {tabIndex === 1 && <TableList />}
      </div>
    </div>
  );
};

export default TourPackageLayout;
