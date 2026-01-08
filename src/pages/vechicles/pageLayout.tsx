import { useEffect, useState } from "react";
import PageTabBar from "../../components/pageTabBar";

import AddVehicleForm from "./addForm";
import VehicleTableList from "./tableView";
import EditVehicleForm from "./editForm";
import ViewVehicleDetails from "./viewDetails";

import { useEditMgmtStore } from "../../store/editMgmtStore";

const VehicleLayout = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const isEditing = useEditMgmtStore((s) => !!s.editVehicleData);
  const isViewing = useEditMgmtStore((s) => !!s.viewVehicleData);

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
        {tabIndex === 0 && <VehicleTableList />}

        {tabIndex === 1 &&
          (isEditing ? <EditVehicleForm /> : <AddVehicleForm />)}

        {tabIndex === 2 && isViewing && <ViewVehicleDetails />}
      </div>
    </div>
  );
};

export default VehicleLayout;
