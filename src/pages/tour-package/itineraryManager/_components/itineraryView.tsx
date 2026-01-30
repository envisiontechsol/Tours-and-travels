import { DayData } from "../itineraryManager";

interface ItineraryViewProps {
  days: DayData[];
  onRemoveDay: (dayValue: string | number) => void;
}

export default function ItineraryView({
  days,
  onRemoveDay,
}: ItineraryViewProps) {
  return (
    <section className="bg-white p-6 rounded-xl shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">Your Itinerary</h2>

      {days.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          No days planned yet. Add your first day plan above.
        </p>
      ) : (
        <div className="space-y-4">
          {days.map((day) => (
            <DayCard key={day.day.value} day={day} onRemoveDay={onRemoveDay} />
          ))}
        </div>
      )}
    </section>
  );
}

interface DayCardProps {
  day: DayData;
  onRemoveDay: (dayValue: string | number) => void;
}

function DayCard({ day, onRemoveDay }: DayCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg text-gray-800">{day.day.label}</h3>
        <button
          type="button"
          onClick={() => onRemoveDay(day.day.value)}
          className="text-red-500 hover:text-red-700 text-sm font-medium"
        >
          Remove
        </button>
      </div>

      {day.comment && (
        <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-start gap-2">
            <svg
              className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <p className="text-sm text-blue-800">{day.comment}</p>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {day.cards.map((card) => (
          <div
            key={card.id}
            className="px-3 py-2 bg-green-50 border border-green-200 rounded-md text-green-800 font-medium"
          >
            {card.title}
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          {day.cards.length} activity
          {day.cards.length !== 1 ? "ies" : ""} planned
        </p>
      </div>
    </div>
  );
}
