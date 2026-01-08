import { useEffect, useState } from "react";
import PageTabBar from "../../components/pageTabBar";
import { useEditMgmtStore } from "../../store/editMgmtStore";
import TableView from "./tableView";
import AddUsersForm from "./addForm";
import EditPermission from "./editPermission";
import ViewPermissionDetails from "./viewPermissionDetails";
// import AddPackageTypeForm from "./addForm";
// import EditPackageTypeForm from "./editForm";
// import PackageTypeTable from "./tableView";
// import ViewDetails from "./viewDetails";

const UsersLayout = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const isEditing = useEditMgmtStore((s) => !!s.editUserPermission);
  const isViewing = useEditMgmtStore((s) => !!s.viewUserPermission);

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
        {tabIndex === 1 ? (
          isEditing ? (
            <EditPermission />
          ) : (
            <AddUsersForm />
          )
        ) : null}

        {tabIndex === 2 && isViewing && <ViewPermissionDetails />}
        {tabIndex === 0 && <TableView />}
      </div>
    </div>
  );
};

export default UsersLayout;
