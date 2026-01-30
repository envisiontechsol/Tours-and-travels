import { useEffect, useMemo, useState } from "react";
import {
  ActivityListResType,
  ActivityResType,
  ItineraryActivityResType,
} from "../../../types/activityTypes";
import { SlotsCategoryResType } from "../../../types/slotsTypes";
import { fetchSlotsCategoryReq } from "../../../services/api/others/slotsCatApi";
import {
  fetchActivitiesByCatReq,
  fetchActivitiesByTourIdReq,
} from "../../../services/api/activites/activityApi";
import { ActivitySelectionManager } from "./_components/activitySelectionManager";
import TimeSlotSelector from "./_components/timeSlotSelector";
import ActivitySearch from "./_components/activitySearch";
import ActivityList from "./_components/activityList";
import DayPlanner from "./_components/dayPlanner";
import ItineraryView from "./_components/itineraryView";

interface _ActivityType extends ActivityResType {
  category: string;
  dayComment?: string; // Add this if backend provides it
}

type Option = {
  label: string;
  value: string | number;
};

export type DayData = {
  day: Option;
  cards: ActivityListResType[];
  comment?: string; // Added comment field
};

interface ItineraryManagerProps {
  tourId?: string;
  numberOfDays: number;
  destinationId?: string;
  onChangeItinerary: (d: DayData[]) => void;
}

export default function ItineraryManager({
  tourId,
  numberOfDays,
  destinationId,
  onChangeItinerary,
}: ItineraryManagerProps) {
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
  const [timeSlots, setTimeSlots] = useState<SlotsCategoryResType[]>([]);
  const [loadingTimeSlots, setLoadingTimeSlots] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [addSectionError, setAddSectionError] = useState("");
  const [selectionError, setSelectionError] = useState("");
  const [loadingCards, setLoadingCards] = useState(true);
  const [dayComment, setDayComment] = useState<string>(""); // New state for day comment

  // ---------------------- FILTER DAYS ----------------------
  const availableDays = useMemo(() => {
    const usedValues = days.map((d) => d.day.value);
    return PREDEFINED_DAYS.filter((d) => !usedValues.includes(d.value));
  }, [days, PREDEFINED_DAYS]);

  // Notify parent when days change
  useEffect(() => {
    onChangeItinerary(days || []);
  }, [days, onChangeItinerary]);

  // Fetch time slots on mount
  useEffect(() => {
    const getTimeSlots = async () => {
      try {
        setLoadingTimeSlots(true);
        const res = await fetchSlotsCategoryReq();
        if (Array.isArray(res?.data)) {
          setTimeSlots(res?.data);
        }
      } catch (error) {
        console.error("Failed to fetch time slots:", error);
        setTimeSlots([]);
      } finally {
        setLoadingTimeSlots(false);
      }
    };
    getTimeSlots();
  }, []);

  // Fetch activities when category changes
  useEffect(() => {
    if (!selectedCategory || !destinationId) {
      setCardsList([]);
      return;
    }
    (async () => {
      try {
        setLoadingCards(true);
        const res = await fetchActivitiesByCatReq(
          selectedCategory,
          destinationId,
        );
        setCardsList(res?.data || []);
        setSearchText("");
        setSelectionError("");
      } catch (error) {
        setCardsList([]);
      } finally {
        setLoadingCards(false);
      }
    })();
  }, [selectedCategory, destinationId]);

  // Reset comment when day selection changes
  useEffect(() => {
    setDayComment("");
  }, [selectedDay]);

  // Map API data to DayData format
  function mapApiItineraryToDays(
    apiData: ItineraryActivityResType[],
  ): DayData[] {
    if (!apiData || apiData.length === 0) return [];

    const grouped: Record<
      number,
      { cards: _ActivityType[]; comment?: string }
    > = {};

    apiData.forEach((item) => {
      if (!grouped[item.dayNumber]) {
        grouped[item.dayNumber] = {
          cards: [],
          comment: (item as any).dayComment, // Adjust based on your API response
        };
      }
      grouped[item.dayNumber].cards.push(item as _ActivityType);
    });

    const result: DayData[] = Object.entries(grouped).map(([dayNum, data]) => ({
      day: {
        label: `Day ${dayNum}`,
        value: Number(dayNum),
      },
      cards: data.cards,
      comment: data.comment, // Include comment from backend
    }));

    return result;
  }

  // Fetch existing itinerary when tourId is provided
  useEffect(() => {
    const getActivities = async () => {
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
      getActivities();
    }
  }, [tourId]);

  // ---------------------- HANDLERS ----------------------
  const handleAddCard = (card: ActivityListResType) => {
    ActivitySelectionManager.addCard({
      card,
      selectedCards,
      setSelectedCards,
      setSelectionError,
    });
  };

  const handleRemoveCard = (cardId: string) => {
    setSelectedCards((prev) => prev.filter((card) => card.id !== cardId));
    setSelectionError("");
  };

  const handleAddDay = () => {
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

    // Include comment when adding day
    setDays((prev) => [
      ...prev,
      {
        day: selectedDay,
        cards: [...selectedCards],
        comment: dayComment.trim() || undefined, // Save comment (or undefined if empty)
      },
    ]);

    // Reset section
    setSelectedDay(null);
    setSelectedCards([]);
    setSearchText("");
    setSelectedCategory(null);
    setCardsList([]);
    setDayComment(""); // Reset comment field
  };

  const handleRemoveDay = (dayValue: string | number) => {
    setDays((prev) => prev.filter((day) => day.day.value !== dayValue));
  };

  const handleDayChange = (day: Option | null) => {
    setSelectedDay(day);
    setAddSectionError("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4 bg-gray-100 rounded">
      {/* LEFT SECTION - Activity Selection */}
      <div>
        <section className="bg-white p-6 rounded-xl shadow-md w-full">
          <h2 className="text-xl font-bold mb-4">Select Activities</h2>

          <TimeSlotSelector
            timeSlots={timeSlots}
            loadingTimeSlots={loadingTimeSlots}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <ActivitySearch
            searchText={searchText}
            onSearchChange={setSearchText}
            disabled={!selectedCategory}
          />

          {selectionError && (
            <p className="text-red-500 text-sm mb-3">{selectionError}</p>
          )}

          <ActivityList
            cards={cardsList}
            searchText={searchText}
            loadingCards={loadingCards}
            selectedCategory={selectedCategory}
            onAddCard={handleAddCard}
          />
        </section>
      </div>

      {/* RIGHT SECTION - Day Planning & Itinerary View */}
      <div className="space-y-4">
        <DayPlanner
          availableDays={availableDays}
          selectedDay={selectedDay}
          selectedCards={selectedCards}
          addSectionError={addSectionError}
          dayComment={dayComment}
          onDayChange={handleDayChange}
          onRemoveCard={handleRemoveCard}
          onClearCards={() => setSelectedCards([])}
          onAddDay={handleAddDay}
          onCommentChange={setDayComment}
        />

        <ItineraryView days={days} onRemoveDay={handleRemoveDay} />
      </div>
    </div>
  );
}
