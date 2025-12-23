import { ViewFieldConfigType } from "../../types/formsTypes";
import { TourPackageResType } from "../../types/tourTypes";

export const getViewFields = (
  data?: TourPackageResType | null
): ViewFieldConfigType[] => [
  { label: "Package Name", key: "name" },
  { label: "Slug", key: "slug" },
  { label: "Top 10 Rank", key: "top10Rank", type: "number" },
  { label: "Status", key: "isActive", type: "boolean" },
  { label: "Selected", key: "selected", type: "boolean" },
  { label: "Banner Tag", key: "bannerImagetage" },
  { label: "About", key: "about" },
  { label: "Price (INR)", key: "priceInINR", type: "number" },
  { label: "Fake Price (INR)", key: "fakePriceInINR", type: "number" },
  { label: "Rating", key: "rating", type: "number" },
  { label: "Code", key: "code" },
  { label: "URL", key: "url" },
  { label: "Duration", key: "duration.name" },
  { label: "Days", key: "duration.days", type: "number" },
  { label: "Nights", key: "duration.nights", type: "number" },
  { label: "Destination", key: "destination.name" },
  { label: "Destination Slug", key: "destination.slug" },
  { label: "Type", key: "type.name" },
  { label: "Type Slug", key: "type.slug" },
  { label: "Profit Margin %", key: "profitMarginPct", type: "number" },
  { label: "Flight Margin %", key: "FlightMarginPct", type: "number" },
  { label: "Hotel Margin %", key: "HotelMarginPct", type: "number" },
  { label: "Starting City", key: "startingCity" },
  { label: "Inclusion Text", key: "inclusionText" },
  { label: "Exclusion Text", key: "exclusionText" },
  // { label: "Created At", key: "createdAt", type: "date" },
  // { label: "Updated At", key: "updatedAt", type: "date" },
  {
    label: "Tags",
    key: "tags",
    type: "text",
    render: () => data?.tags.map((tag) => tag.name).join(", "),
  },
  { label: "Banner Image", key: "bannerImageUrl", type: "image" },
];
