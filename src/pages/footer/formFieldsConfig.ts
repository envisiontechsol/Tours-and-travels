import { FormFieldConfigType, OptionType } from "../../types/formsTypes";
import { footerTypes } from "./contants";

export const getFormFieldsConfig = ({
  footerOptions,
}: {
  footerOptions: OptionType[];
}): FormFieldConfigType[] => [
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
  {
    name: "type",
    label: "Type",
    type: "select",
    placeholder: "Select type",
    required: true,
    gridCols: "md:col-span-1",
    options: footerOptions,
  },
];
