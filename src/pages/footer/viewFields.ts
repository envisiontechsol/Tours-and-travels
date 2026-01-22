import { ViewFieldConfigType } from "../../types/formsTypes";
import { FooterResType } from "../../types/footerTypes";

export const getViewFields = (
  data?: FooterResType | null,
): ViewFieldConfigType[] => [
  { label: "Name", key: "name" },
  {
    label: "Value",
    key: "value",
    type: "text",
  },
];
