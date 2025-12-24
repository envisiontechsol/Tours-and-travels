import dayjs from "dayjs";

interface Props {
  days: any[];
}

const DayWiseItineraryView: React.FC<Props> = ({ days }) => {
  if (!days?.length) {
    return (
      <div className="mt-4 text-sm text-gray-500">
        No itinerary details available
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-6">
      {days.map((day) => (
        <div key={day.dayNumber} className="border rounded-lg p-4 bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-lg">Day {day.dayNumber}</h3>
            <span className="text-sm text-gray-500">
              {dayjs(day.date).format("DD MMM YYYY")}
            </span>
          </div>

          <div className="space-y-3">
            {day.activities.map((activity: any) => (
              <div
                key={activity.userItineraryActivityId}
                className="flex gap-4 p-3 border rounded-md bg-white"
              >
                <img
                  src={activity.activityImageUrl}
                  alt={activity.activityTitle}
                  className="w-20 h-20 rounded object-cover"
                />

                <div className="flex-1">
                  <h4 className="font-medium">{activity.activityTitle}</h4>

                  <div className="text-sm text-gray-600 mt-1">
                    {activity.category?.name}
                  </div>

                  <div className="text-sm mt-1">
                    ₹ {activity.pricePerPersonInINR} × {activity.peopleCount} ={" "}
                    <span className="font-semibold">
                      ₹ {activity.totalPriceInINR}
                    </span>
                  </div>

                  {activity.editable && (
                    <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded">
                      Editable
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DayWiseItineraryView;
