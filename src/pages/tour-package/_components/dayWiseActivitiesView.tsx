import React, { useMemo } from "react";

type ActivityType = {
  id: string;
  dayNumber: number;
  title: string;
  priceInINR: string;
  category: {
    name: string;
  };
  destination: {
    name: string;
  };
};

interface Props {
  activities: ActivityType[];
  loading: boolean;
}

const DayWiseActivitiesView: React.FC<Props> = ({ activities, loading }) => {
  const groupedByDay = useMemo(() => {
    return activities.reduce<Record<number, ActivityType[]>>(
      (acc, activity) => {
        if (!acc[activity.dayNumber]) {
          acc[activity.dayNumber] = [];
        }
        acc[activity.dayNumber].push(activity);
        return acc;
      },
      {}
    );
  }, [activities]);

  if (loading) {
    return (
      <div className="mt-6 flex justify-center">
        <span className="text-gray-500 text-sm">Loading activities...</span>
      </div>
    );
  }

  if (!activities.length) {
    return (
      <div className="mt-6 text-center text-gray-500 text-sm">
        No activities available
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.entries(groupedByDay)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([day, dayActivities]) => (
          <div key={day} className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Day {day}</h3>

            <div className="space-y-3">
              {dayActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex justify-between items-start border rounded-md p-3 bg-gray-50"
                >
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-600">
                      {activity.category?.name} · {activity.destination?.name}
                    </p>
                  </div>

                  <div className="text-sm font-semibold text-gray-800">
                    ₹{activity.priceInINR}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default DayWiseActivitiesView;
