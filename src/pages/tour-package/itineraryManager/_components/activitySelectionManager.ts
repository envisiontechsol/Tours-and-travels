import { ActivityListResType } from "../../../../types/activityTypes";

const MAX_TOTAL_VALUE = 3;
const SLOT_ERROR = "An activity is already selected for this time slot";

interface AddCardParams {
  card: ActivityListResType;
  selectedCards: ActivityListResType[];
  setSelectedCards: React.Dispatch<React.SetStateAction<ActivityListResType[]>>;
  setSelectionError: React.Dispatch<React.SetStateAction<string>>;
}

const getCode = (c?: number | string) => Number(c ?? 0);
const getValue = (v?: number) => Number(v ?? 0);

export const ActivitySelectionManager = {
  addCard: ({
    card,
    selectedCards,
    setSelectedCards,
    setSelectionError,
  }: AddCardParams) => {
    setSelectionError("");

    // First card → directly add
    if (!selectedCards.length) {
      setSelectedCards((prev) => [...prev, card]);
      return;
    }

    const cardCode = getCode(card.categoryCode);
    const cardValue = getValue(card.categoryValue);

    // Duplicate activity
    if (selectedCards.some((c) => c.id === card.id)) {
      setSelectionError("This activity is already selected");
      return;
    }

    // Same category (slot)
    if (selectedCards.some((c) => c.category === card.category)) {
      setSelectionError(SLOT_ERROR);
      return;
    }

    // Total value check
    const totalValue =
      selectedCards.reduce((sum, a) => sum + getValue(a.categoryValue), 0) +
      cardValue;

    if (totalValue > MAX_TOTAL_VALUE) {
      setSelectionError(SLOT_ERROR);
      return;
    }

    // Check combinations
    const hasCategoryCode = (code: number) =>
      selectedCards.some((c) => getCode(c.categoryCode) === code);

    const hasCategoryCodeInRange = (predicate: (code: number) => boolean) =>
      selectedCards.some((c) => predicate(getCode(c.categoryCode)));

    // 4 + 5 combination is allowed (within value limit)
    const isFourFiveCombo =
      (hasCategoryCode(4) && cardCode === 5) ||
      (hasCategoryCode(5) && cardCode === 4);

    if (isFourFiveCombo) {
      setSelectedCards((prev) => [...prev, card]);
      return;
    }

    // Invalid combinations
    if (cardCode <= 2 && hasCategoryCode(4)) {
      setSelectionError(SLOT_ERROR);
      return;
    }

    if (cardCode >= 2 && hasCategoryCode(5)) {
      setSelectionError(SLOT_ERROR);
      return;
    }

    if (cardCode === 4 && hasCategoryCodeInRange((c) => c <= 2)) {
      setSelectionError(SLOT_ERROR);
      return;
    }

    if (cardCode === 5 && hasCategoryCodeInRange((c) => c >= 2)) {
      setSelectionError(SLOT_ERROR);
      return;
    }

    // ✅ Passed all rules
    setSelectedCards((prev) => [...prev, card]);
  },
};
