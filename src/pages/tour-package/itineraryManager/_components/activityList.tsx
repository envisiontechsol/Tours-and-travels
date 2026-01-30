import { ActivityListResType } from "../../../../types/activityTypes";

interface ActivityListProps {
  cards: ActivityListResType[];
  searchText: string;
  loadingCards: boolean;
  selectedCategory: number | null;
  onAddCard: (card: ActivityListResType) => void;
}

export default function ActivityList({
  cards,
  searchText,
  loadingCards,
  selectedCategory,
  onAddCard,
}: ActivityListProps) {
  const filteredCards = cards.filter((c) =>
    c.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div className="space-y-3 max-h-64 overflow-y-auto">
      {!loadingCards &&
        filteredCards.map((card) => (
          <div
            key={card.id}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
            onClick={() => onAddCard(card)}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="font-medium">{card.title}</span>
            </div>
            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Add +
            </button>
          </div>
        ))}

      {filteredCards.length === 0 && selectedCategory && (
        <p className="text-gray-400 text-sm text-center py-4">
          No activities found for this time slot.
        </p>
      )}
      {loadingCards && (
        <p className="text-gray-400 text-sm text-center py-4">Loading...</p>
      )}

      {!selectedCategory && (
        <p className="text-gray-400 text-sm text-center py-4">
          Please select a time slot to view activities.
        </p>
      )}
    </div>
  );
}
