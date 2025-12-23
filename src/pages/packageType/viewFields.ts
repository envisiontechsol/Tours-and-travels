import { ViewFieldConfigType } from "../../types/formsTypes";

export const getViewFields = (): ViewFieldConfigType[] => [
  { label: "Package Name", key: "name" },
  { label: "Slug", key: "slug" },
  // { label: "Created At", key: "createdAt", type: "date" },
  // { label: "Updated At", key: "updatedAt", type: "date" }
];
