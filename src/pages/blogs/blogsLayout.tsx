import { useEffect, useState } from "react";
import PageTabBar from "../../components/pageTabBar";
import { useEditMgmtStore } from "../../store/editMgmtStore";
import AddForm from "./addForm";
import EditForm from "./editForm";
import TableList from "./tableView";
import ViewDetails from "./viewDetails";

const BlogLayout = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const isEditing = useEditMgmtStore((s) => !!s.editBlogData);
  const isViewing = useEditMgmtStore((s) => !!s.viewBlogData);

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
        {tabIndex === 1 && (isEditing ? <EditForm /> : <AddForm />)}

        {tabIndex === 0 && <TableList />}

        {tabIndex === 2 && isViewing && <ViewDetails />}
      </div>
    </div>
  );
};

export default BlogLayout;
