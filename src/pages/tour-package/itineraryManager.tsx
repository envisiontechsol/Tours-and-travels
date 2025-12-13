import { useEffect, useMemo, useState } from "react";
import SelectInput from "../../components/forms/elements/selectInput";
import {
  fetchActivitiesByCatReq,
  fetchActivitiesByTourIdReq,
} from "../../services/api/activites/activityApi";
import { fetchSlotsCategoryReq } from "../../services/api/others/slotsCatApi";
import {
  ActivityListResType,
  ActivityResType,
  ItineraryActivityResType,
} from "../../types/activityTypes";
import { SlotsCategoryResType } from "../../types/slotsTypes";

interface _ActivityType extends ActivityResType {
  category: string;
}
type DayData = {
  day: Option;
  cards: ActivityListResType[];
};

interface Option {
  label: string;
  value: string | number;
}

export default function ItineraryManager({
  tourId,
  numberOfDays,
  onChangeItinerary,
  destinationId,
}: {
  tourId?: string;
  numberOfDays: number;
  destinationId?: string;
  onChangeItinerary: (d: DayData[]) => void;
}) {
  const PREDEFINED_DAYS: Option[] = useMemo(() => {
    let opts = [];

    for (let index = 0; index < numberOfDays; index++) {
      opts.push({
        label: `Day ${index + 1}`,
        value: index + 1,
      });
    }
    return opts;
  }, [numberOfDays]);

  const [selectedDay, setSelectedDay] = useState<Option | null>(null);
  const [selectedCards, setSelectedCards] = useState<ActivityListResType[]>([]);
  const [cardsList, setCardsList] = useState<ActivityListResType[]>([]);
  const [days, setDays] = useState<DayData[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [timeSlots, settimeSlots] = useState<SlotsCategoryResType[]>([]);
  const [loadingTimeSlots, setloadingTimeSlots] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [addSectionError, setAddSectionError] = useState("");
  const [selectionError, setSelectionError] = useState("");
  const [loadingCards, setloadingCards] = useState(true);

  // ---------------------- FILTER DAYS ----------------------
  const availableDays = useMemo(() => {
    const usedValues = days.map((d) => d.day.value);
    return PREDEFINED_DAYS.filter((d) => !usedValues.includes(d.value));
  }, [days, PREDEFINED_DAYS]);

  useEffect(() => {
    onChangeItinerary(days || []);
  }, [days]);

  useEffect(() => {
    const getTimeSlots = async () => {
      try {
        setloadingTimeSlots(true);
        const res = await fetchSlotsCategoryReq();
        if (Array.isArray(res?.data)) {
          settimeSlots(res?.data);
        }
      } catch (error) {
        console.error("Failed to fetch time slots:", error);
        settimeSlots([]);
      } finally {
        setloadingTimeSlots(false);
      }
    };
    getTimeSlots();
  }, []);

  // ---------------------- FILTER CARDS BASED ON SEARCH ----------------------
  const filteredCards = useMemo(() => {
    return cardsList.filter((c) =>
      c.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [cardsList, searchText]);

  // ---------------------- ADD CARD TO SELECTION ----------------------
  const MAX_TOTAL_VALUE = 3;
  const SLOT_ERROR = "An activity is already selected for this time slot";

  const getCode = (c?: number | string) => Number(c ?? 0);
  const getValue = (v?: number) => Number(v ?? 0);

  const hasCategoryCode = (code: number) =>
    selectedCards.some((c) => getCode(c.categoryCode) === code);

  const hasCategoryCodeInRange = (predicate: (code: number) => boolean) =>
    selectedCards.some((c) => predicate(getCode(c.categoryCode)));

  const getTotalValue = () =>
    selectedCards.reduce((sum, a) => sum + getValue(a.categoryValue), 0);

  const addCard = (card: ActivityListResType) => {
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
    const totalValue = getTotalValue() + cardValue;
    if (totalValue > MAX_TOTAL_VALUE) {
      setSelectionError(SLOT_ERROR);
      return;
    }

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
  };

  const removeCard = (cardId: string) => {
    setSelectedCards((prev) => prev.filter((card) => card.id !== cardId));
    setSelectionError("");
  };

  // ---------------------- ADD DAY ----------------------
  const handleAdd = () => {
    if (!selectedDay) {
      setAddSectionError("Please select a day");
      return;
    }

    if (selectedCards.length < 2) {
      setAddSectionError("Please select minimum 2 activities");
      return;
    }

    if (selectedCards.length > 3) {
      setAddSectionError("Maximum 3 activities allowed");
      return;
    }

    setAddSectionError("");

    setDays((prev) => [
      ...prev,
      { day: selectedDay, cards: [...selectedCards] },
    ]);

    // Reset section
    setSelectedDay(null);
    setSelectedCards([]);
    setSearchText("");
    setSelectedCategory(null);
    setCardsList([]);
  };

  // ---------------------- REMOVE DAY ----------------------
  const removeDay = (dayValue: string | number) => {
    setDays((prev) => prev.filter((day) => day.day.value !== dayValue));
  };

  // ---------------------- API CALL WHEN CATEGORY CHANGES ----------------------
  useEffect(() => {
    if (!selectedCategory || !destinationId) {
      setCardsList([]);
      return;
    }
    (async () => {
      try {
        setloadingCards(true);
        const res = await fetchActivitiesByCatReq(
          selectedCategory,
          destinationId
        );
        setCardsList(res?.data || []);
        setSearchText("");
        setSelectionError("");
      } catch (error) {
        setCardsList([]);
      } finally {
        setloadingCards(false);
      }
    })();
  }, [selectedCategory, destinationId]);

  function mapApiItineraryToDays(
    apiData: ItineraryActivityResType[]
  ): DayData[] {
    if (!apiData || apiData.length === 0) return [];

    // Group activities by dayNumber
    const grouped: Record<number, _ActivityType[]> = {};

    apiData.forEach((item) => {
      if (!grouped[item.dayNumber]) grouped[item.dayNumber] = [];
      grouped[item.dayNumber].push(item);
    });

    // Convert to DayData[]
    const result: DayData[] = Object.entries(grouped).map(
      ([dayNum, cards]) => ({
        day: {
          label: `Day ${dayNum}`,
          value: Number(dayNum),
        },
        cards: cards,
      })
    );

    return result;
  }

  useEffect(() => {
    const getActivites = async () => {
      try {
        const res = await fetchActivitiesByTourIdReq(tourId || "");
        if (Array.isArray(res?.data)) {
          const mapped = mapApiItineraryToDays(res?.data);
          setDays(mapped);
        }
      } catch (error) {
        setDays([]);
      }
    };
    if (tourId) {
      getActivites();
    }
  }, [tourId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4 bg-gray-100 rounded">
      {/* ---------------------- LEFT SECTION ---------------------- */}
      <div>
        <section className="bg-white p-6 rounded-xl shadow-md w-full">
          <h2 className="text-xl font-bold mb-4">Select Activities</h2>

          {/* Time Slot Selection */}
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
                    onClick={() => setSelectedCategory(slot.code)}
                  >
                    {slot.name}
                  </button>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No time slots available</p>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search activities..."
            className="border p-2 rounded-md w-full my-4"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            disabled={!selectedCategory}
          />

          {/* Selection Error */}
          {selectionError && (
            <p className="text-red-500 text-sm mb-3">{selectionError}</p>
          )}

          {/* Activities List */}
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {!loadingCards &&
              filteredCards.map((card) => (
                <div
                  key={card.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => addCard(card)}
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
                No activities found for {selectedCategory}.
              </p>
            )}
            {loadingCards && (
              <p className="text-gray-400 text-sm text-center py-4">
                Loading...
              </p>
            )}

            {!selectedCategory && (
              <p className="text-gray-400 text-sm text-center py-4">
                Please select a time slot to view activities.
              </p>
            )}
          </div>
        </section>
      </div>

      {/* ---------------------- RIGHT SECTION ---------------------- */}
      <div className="space-y-4">
        {/* Add Section */}
        <section className="bg-white p-6 rounded-xl shadow-md w-full">
          <h2 className="text-xl font-bold mb-4">Add Day Plan</h2>

          {/* Day Dropdown */}
          <SelectInput
            label="Select Day"
            options={availableDays}
            value={selectedDay}
            onChange={(val) => {
              setSelectedDay(val);
              setAddSectionError("");
            }}
          />

          {/* Selected Activities Preview */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Selected Activities ({selectedCards.length}/3)
              </label>
              {selectedCards.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedCards([])}
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
                        onClick={() => removeCard(card.id)}
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

          {/* Error Message */}
          {addSectionError && (
            <p className="text-red-500 text-sm mt-2 font-medium">
              {addSectionError}
            </p>
          )}

          {/* Add Button */}
          <button
            type="button"
            onClick={handleAdd}
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

        {/* View Section */}
        <section className="bg-white p-6 rounded-xl shadow-md w-full">
          <h2 className="text-xl font-bold mb-4">Your Itinerary</h2>

          {days.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              No days planned yet. Add your first day plan above.
            </p>
          ) : (
            <div className="space-y-4">
              {days.map((day, index) => (
                <div
                  key={day.day.value}
                  className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {day.day.label}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeDay(day.day.value)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>

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
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
