export interface UserItinerayListResType {
  itineraryId: string;
  userId: string;
  name: string;
  phone: string;
  durationn: string;
  packageType: string;
  startDate: string;
  destation: string;
  comment: string;
  startCity: string;
}

export type UserItineraryDetailsResType = {
  itineraryId: string;
  startCity: string;

  destination: {
    id: string;
    name: string;
    slug: string;
  };

  tourPackage: {
    id: string;
    name: string;
    slug: string;
    code: string;

    priceInINR: number;
    fakePriceInINR: number | null;
    rating: number;
    profitMarginPct: number;

    startingCity: string | null;

    bannerImageUrl: string | null;
    bannerImagetage: string | null;

    tourImageUrl?: string | null;
    tourImagetage?: string | null;

    detailsImageUrl?: string | null;
    detailsImagetage?: string | null;

    image1Url?: string | null;
    image1tage?: string | null;

    image2Url?: string | null;
    image2tage?: string | null;

    image3Url?: string | null;
    image3tage?: string | null;
  };

  startDate: string;
  endDate: string;

  numDays: number;
  numPeople: number;

  totalPriceInINR: number;

  days: {
    dayNumber: number;
    date: string;

    activities: {
      editable: boolean;

      userItineraryActivityId: string;
      activityId: string;

      activityTitle: string;
      activityImageUrl: string | null;

      categoryId: string;
      category: {
        code: number;
        name: "MORNING" | "AFTERNOON" | "EVENING";
      };

      pricePerPersonInINR: number;
      peopleCount: number;
      totalPriceInINR: number;
    }[];
  }[];
};
