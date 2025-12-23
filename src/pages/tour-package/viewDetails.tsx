import { useEffect, useMemo, useState } from "react";
import DynamicView from "../../components/forms/viewFormFields";
import {
  closeAllViewAction,
  useEditMgmtStore,
} from "../../store/editMgmtStore";
import { ViewFieldConfigType } from "../../types/formsTypes";
import { getViewFields } from "./viewFields";
import { fetchActivitiesByTourIdReq } from "../../services/api/activites/activityApi";
import DayWiseActivitiesView from "./_components/dayWiseActivitiesView";

const ViewDetails = () => {
  const data = useEditMgmtStore((s) => s.viewTourPackageData);

  const [activities, setActivities] = useState<any[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(false);

  const viewFields: ViewFieldConfigType[] = useMemo(
    () => getViewFields(data),
    [data]
  );

  useEffect(() => {
    const getActivities = async () => {
      try {
        setLoadingActivities(true);
        const res = await fetchActivitiesByTourIdReq(data?.id || "");
        setActivities(res?.data || []);
      } catch (error) {
        setActivities([]);
      } finally {
        setLoadingActivities(false);
      }
    };

    if (data?.id) {
      getActivities();
    }
  }, [data?.id]);

  if (!data) return null;

  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm relative bg-white">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Tour Package Details
      </div>

      <div className="mt-6">
        {/* Tour package info */}
        <DynamicView data={data} fields={viewFields} />

        {/* Activities */}
        <h2 className="mt-8 text-xl font-semibold">Itinerary / Activities</h2>

        <DayWiseActivitiesView
          activities={activities}
          loading={loadingActivities}
        />

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
