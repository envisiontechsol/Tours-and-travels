import { ViewFieldConfigType } from "../../types/formsTypes";

export const getViewFields = (): ViewFieldConfigType[] => [
  { label: "Name", key: "name" },
  { label: "Menu Name", key: "topLevel.name" },
  // { label: "Top Level Slug", key: "topLevel.slug" },
  // { label: "Created At", key: "createdAt", type: "date" },
  // { label: "Updated At", key: "updatedAt", type: "date" }
];
