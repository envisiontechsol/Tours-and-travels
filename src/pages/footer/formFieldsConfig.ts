import { FormFieldConfigType } from "../../types/formsTypes";

export const getFormFieldsConfig = (): FormFieldConfigType[] => [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter Footer Name",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "value",
    label: "Value",
    type: "text",
    placeholder: "Enter Footer Value",
    required: true,
    gridCols: "md:col-span-1",
  },
];
