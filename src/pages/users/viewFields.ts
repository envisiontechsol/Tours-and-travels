import { ViewFieldConfigType } from "../../types/formsTypes";

export const getViewFields = (): ViewFieldConfigType[] => [
  { label: "Name", key: "name" },
  { label: "Phone Number", key: "phone" },
  { label: "Email", key: "email" },
];
