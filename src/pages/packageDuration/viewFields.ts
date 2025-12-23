import { ViewFieldConfigType } from "../../types/formsTypes";

export const getViewFields = (): ViewFieldConfigType[] => [
  { label: "Package Name", key: "name" },
  { label: "Days", key: "days", type: "number" },
  { label: "Nights", key: "nights", type: "number" },
  // { label: "Created At", key: "createdAt", type: "date" },
  // { label: "Updated At", key: "updatedAt", type: "date" }
];
