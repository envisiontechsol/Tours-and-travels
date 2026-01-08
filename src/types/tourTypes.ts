export interface TourPackageResType {
  id: string;
  name: string;
  slug: string;
  url: string;
  code: string;

  priceInINR: string; // API gives string
  fakePriceInINR: string; // string
  profitMarginPct: string; // string
  FlightMarginPct: string; // string
  HotelMarginPct: string; // string

  rating: string; // string from API
  about: string | null;

  isActive: boolean;
  selected: boolean;

  bannerImageUrl: string | null;
  bannerImagetage: string | null;

  tourImageUrl: string | null;
  tourImagetage: string | null;

  detailsImageUrl: string | null;
  detailsImagetage: string | null;

  image1Url: string | null;
  image1tage: string | null;

  image2Url: string | null;
  image2tage: string | null;

  image3Url: string | null;
  image3tage: string | null;

  startingCity: string | null;
  inclusionText: string | null;
  exclusionText: string | null;

  destinationId: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;

  duration: DurationType;
  tags: TagType[];
  destination: DestinationType;
  type: PackageType;
  hotelRatingText: string;
  activitiesIncluded: boolean;
  hotels3Star: boolean;
  concierge24x7: boolean;
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
}

export interface DurationType {
  id: string;
  name: string;
  days: number;
  nights: number;
}

export interface TagType {
  id: string;
  name: string;
}

export interface DestinationType {
  id: string;
  name: string;
  slug: string;
}
export interface PackageType {
  id: string;
  name: string;
  slug: string;
}
