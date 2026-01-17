import { FormFieldConfigType } from "../../types/formsTypes";

export const getFormFields = (): FormFieldConfigType[] => [
  {
    name: "name",
    label: "Menu Name",
    type: "text",
    placeholder: "Enter menu name",
    required: true,
    gridCols: "md:col-span-1",
  },

  {
    name: "orderBy",
    label: "Order By",
    type: "number",
    placeholder: "Enter number",
    gridCols: "md:col-span-1",
  },
];
