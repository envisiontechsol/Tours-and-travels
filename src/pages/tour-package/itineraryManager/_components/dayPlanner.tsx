import SelectInput from "../../../../components/forms/elements/selectInput";
import { ActivityListResType } from "../../../../types/activityTypes";
import { DayData } from "../itineraryManager";

interface DayPlannerProps {
  availableDays: DayData["day"][];
  selectedDay: DayData["day"] | null;
  selectedCards: ActivityListResType[];
  addSectionError: string;
  onDayChange: (day: DayData["day"] | null) => void;
  onRemoveCard: (cardId: string) => void;
  onClearCards: () => void;
  onAddDay: () => void;
  dayComment: string;
  onCommentChange: (comment: string) => void;
}

export default function DayPlanner({
  availableDays,
  selectedDay,
  selectedCards,
  addSectionError,
  onDayChange,
  onRemoveCard,
  onClearCards,
  onAddDay,
  dayComment,
  onCommentChange,
}: DayPlannerProps) {
  return (
    <section className="bg-white p-6 rounded-xl shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">Add Day Plan</h2>

      <SelectInput
        label="Select Day"
        options={availableDays}
        value={selectedDay}
        onChange={onDayChange}
      />

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Day Comments (Optional)
        </label>
        <textarea
          value={dayComment}
          onChange={(e) => onCommentChange(e.target.value)}
          placeholder="Add notes or comments for this day..."
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows={3}
          disabled={!selectedDay}
        />
        <p className="text-xs text-gray-500 mt-1">
          Add any special instructions or notes for this day's itinerary
        </p>
      </div>

      <SelectedActivitiesPreview
        selectedCards={selectedCards}
        onRemoveCard={onRemoveCard}
        onClearCards={onClearCards}
      />

      {addSectionError && (
        <p className="text-red-500 text-sm mt-2 font-medium">
          {addSectionError}
        </p>
      )}

      <button
        type="button"
        onClick={onAddDay}
        className={`w-full mt-4 px-4 py-3 rounded-lg font-medium transition-colors ${
          selectedCards.length >= 2
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={selectedCards.length < 2}
      >
        Add Day Plan ({selectedCards.length}/3 activities)
      </button>
    </section>
  );
}

interface SelectedActivitiesPreviewProps {
  selectedCards: ActivityListResType[];
  onRemoveCard: (cardId: string) => void;
  onClearCards: () => void;
}

function SelectedActivitiesPreview({
  selectedCards,
  onRemoveCard,
  onClearCards,
}: SelectedActivitiesPreviewProps) {
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Selected Activities ({selectedCards.length}/3)
        </label>
        {selectedCards.length > 0 && (
          <button
            type="button"
            onClick={onClearCards}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="min-h-[120px] border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-50">
        {selectedCards.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">
            Select activities (min 2, max 3)
          </p>
        ) : (
          <div className="space-y-2">
            {selectedCards.map((card) => (
              <div
                key={card.id}
                className="flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-gray-200 shadow-sm"
              >
                <span className="font-medium text-gray-800">
                  {card.title}{" "}
                  <span className="text-sm text-gray-500">
                    ({card.category})
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => onRemoveCard(card.id)}
                  className="text-red-500 hover:text-red-700 font-bold text-lg w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
