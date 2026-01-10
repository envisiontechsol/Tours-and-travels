import { useEffect, useMemo, useState } from "react";
import PageTabBar, { TabName } from "../../components/pageTabBar";
import { useEditMgmtStore } from "../../store/editMgmtStore";
import AddUsersForm from "./addForm";
import EditUsersForm from "./editForm";
import EditPermission from "./editPermission";
import TableView from "./tableView";
import ViewDetails from "./viewDetails";

const UsersLayout = () => {
  const [activeTab, setActiveTab] = useState<string>("View");
  const isEditing = useEditMgmtStore((s) => !!s.editUser);
  const isViewing = useEditMgmtStore((s) => !!s.viewUser);

  const isEditingPermission = useEditMgmtStore((s) => s.editUserPermission);

  const getTabName = (tab: string) => {
    setActiveTab(tab);
  };

  const tabs = useMemo(() => {
    return [
      TabName.VIEW,
      isEditing ? TabName.EDIT : TabName.ADD,
      ...(isViewing ? [TabName.DETAILS] : []),
      ...(isEditingPermission ? [TabName.EDIT_PERMISSIONS] : []),
    ];
  }, [isEditing, isViewing, isEditingPermission]);

  useEffect(() => {
    if (isEditingPermission) return getTabName(TabName.EDIT_PERMISSIONS);
    if (isViewing) return getTabName(TabName.DETAILS);
    if (isEditing) return getTabName(TabName.EDIT);

    getTabName(TabName.VIEW);
  }, [isEditing, isViewing, isEditingPermission, tabs]);

  return (
    <div className="w-full p-6 relative flex flex-col h-full">
      <PageTabBar
        tabs={tabs}
        activeTab={activeTab}
        onChange={(tab) => getTabName(tab)}
      />

      <div className="overflow-y-auto relative flex flex-1 flex-col py-8 mt-4">
        {activeTab === TabName.ADD && <AddUsersForm />}
        {activeTab === TabName.EDIT && <EditUsersForm />}
        {activeTab === TabName.DETAILS && <ViewDetails />}
        {activeTab === TabName.VIEW && <TableView />}
        {activeTab === TabName.EDIT_PERMISSIONS && <EditPermission />}
      </div>
    </div>
  );
};

export default UsersLayout;
