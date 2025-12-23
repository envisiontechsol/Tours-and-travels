import { ViewFieldConfigType } from "../../types/formsTypes";

export const getViewFields = (): ViewFieldConfigType[] => [
  { label: "Name", key: "name" },
  { label: "Code", key: "code", type: "number" },
  { label: "Value", key: "value", type: "number" },
  { label: "Status", key: "isActive", type: "boolean" },
  // { label: "Created At", key: "createdAt", type: "date" },
  // { label: "Updated At", key: "updatedAt", type: "date" }
];
