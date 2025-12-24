import { useEffect, useMemo, useState } from "react";
import DynamicView from "../../components/forms/viewFormFields";
import {
  closeAllViewAction,
  useEditMgmtStore,
} from "../../store/editMgmtStore";
import { getItineraryViewFields } from "./viewFields";
import DayWiseItineraryView from "./_components/dayWiseItineraryView";

import { toast } from "react-toastify";
import { UserItineraryDetailsResType } from "../../types/user-itinerary-types";
import { fetchUserItineraryByIdReq } from "../../services/api/user-itinerary/user-itinerary-api";

const ViewDetails = () => {
  /** Selected row / minimal data from store */
  const viewData = useEditMgmtStore((s) => s.viewUserItineraryData);

  /** API states */
  const [data, setData] = useState<UserItineraryDetailsResType | null>(null);
  const [loading, setLoading] = useState(false);

  const viewFields = useMemo(() => getItineraryViewFields(data), [data]);

  /* ---------------- FETCH DETAILS ---------------- */
  useEffect(() => {
    if (!viewData?.itineraryId || !viewData?.userId) return;

    const loadDetails = async () => {
      try {
        setLoading(true);

        const res = await fetchUserItineraryByIdReq({
          packageId: viewData.itineraryId,
          userId: viewData.userId,
        });

        if (!res.error) {
          setData(res.data);
        } else {
          toast.error(res.errorMsg || "Failed to load itinerary details");
        }
      } catch (err: any) {
        toast.error(err?.errorMsg || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [viewData]);

  /* ---------------- STATES ---------------- */
  if (!viewData) return null;

  if (loading) {
    return (
      <div className="mt-6 flex justify-center">
        <span className="text-gray-500 text-sm">
          Loading itinerary details...
        </span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mt-6 text-center text-gray-500 text-sm">
        No itinerary details found
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="mt-2 border rounded-lg p-5 shadow-sm bg-white relative">
      <div className="inline-block bg-gray-200 px-4 py-1 text-[15px] font-semibold rounded-md -mt-8 mb-4 shadow-sm absolute">
        Itinerary Details
      </div>

      <div className="mt-6">
        {/* Summary */}
        <DynamicView data={data} fields={viewFields} />

        {/* Day-wise Itinerary */}
        <h2 className="mt-8 text-xl font-semibold">Day-wise Itinerary</h2>

        <DayWiseItineraryView days={data.days} />

        <div className="mt-6 flex justify-end">
          <button
            onClick={closeAllViewAction}
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
