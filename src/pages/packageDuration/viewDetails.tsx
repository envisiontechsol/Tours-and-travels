import { useMemo } from "react";
import DynamicView from "../../components/forms/viewFormFields";
import {
  closeAllViewAction,
  useEditMgmtStore,
} from "../../store/editMgmtStore";
import { ViewFieldConfigType } from "../../types/formsTypes";
import { getViewFields } from "./viewFields";

const ViewDetails = () => {
  const data = useEditMgmtStore((s) => s.viewPackageDurationData);

  const viewFields: ViewFieldConfigType[] = useMemo(() => getViewFields(), []);

  if (!data) return null;

  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm relative bg-white">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Package Duration Details
      </div>

      <div className="mt-6">
        <DynamicView data={data} fields={viewFields} />

        {/* Actions */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => closeAllViewAction()}
            className="px-4 py-2 rounded-md border border-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
