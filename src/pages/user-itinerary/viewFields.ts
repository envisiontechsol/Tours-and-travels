import { UserItineraryDetailsResType } from "./../../types/user-itinerary-types";
import { ViewFieldConfigType } from "../../types/formsTypes";

export const getItineraryViewFields = (
  data?: UserItineraryDetailsResType | null
): ViewFieldConfigType[] => [
  { label: "Start City", key: "startCity" },
  { label: "Destination", key: "destination.name" },
  { label: "Package Name", key: "tourPackage.name" },
  { label: "Package Code", key: "tourPackage.code" },
  { label: "Start Date", key: "startDate", type: "date" },
  { label: "End Date", key: "endDate", type: "date" },
  { label: "Number of Days", key: "numDays", type: "number" },
  { label: "People Count", key: "numPeople", type: "number" },
  {
    label: "Total Price (INR)",
    key: "totalPriceInINR",
    type: "number",
    render: () =>
      data?.totalPriceInINR?.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
  },
  {
    label: "Banner Image",
    key: "tourPackage.bannerImageUrl",
    type: "image",
  },
];
