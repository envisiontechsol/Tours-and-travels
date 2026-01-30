import { SlotsCategoryResType } from "../../../../types/slotsTypes";

interface TimeSlotSelectorProps {
  timeSlots: SlotsCategoryResType[];
  loadingTimeSlots: boolean;
  selectedCategory: number | null;
  onSelectCategory: (category: number) => void;
}

export default function TimeSlotSelector({
  timeSlots,
  loadingTimeSlots,
  selectedCategory,
  onSelectCategory,
}: TimeSlotSelectorProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Time Slot
      </label>
      <div className="flex gap-2 flex-wrap">
        {loadingTimeSlots ? (
          <p className="text-gray-400 text-sm">Loading time slots...</p>
        ) : timeSlots.length > 0 ? (
          timeSlots.map((slot) => (
            <button
              key={slot.id}
              type="button"
              className={`px-4 py-2 rounded-lg border transition-colors ${
                selectedCategory === slot.code
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => onSelectCategory(slot.code)}
            >
              {slot.name}
            </button>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No time slots available</p>
        )}
      </div>
    </div>
  );
}
