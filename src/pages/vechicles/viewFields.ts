import { ViewFieldConfigType } from "../../types/formsTypes";

export const viewFields: ViewFieldConfigType[] = [
  { label: "Vehicle Name", key: "name" },
  { label: "Number of Seats", key: "numberSeats", type: "number" },
  { label: "Status", key: "isActive", type: "boolean" },
  { label: "Description", key: "description" },
  { label: "Vehicle Image", key: "imageUrl", type: "image" },
  { label: "Created At", key: "createdAt", type: "date" },
  { label: "Updated At", key: "updatedAt", type: "date" },
];
