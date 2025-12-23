// src/forms/config/activityFormFields.ts

import { FormFieldConfigType, OptionType } from "../../types/formsTypes";

export const getFormFieldsConfig = (
  tagOpts: OptionType[]
): FormFieldConfigType[] => [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter Name",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "rating",
    label: "Rating",
    type: "number",
    placeholder: "Enter rating",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "location",
    label: "Location",
    type: "text",
    placeholder: "Enter Location",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "feedback",
    label: "Feedback",
    type: "text",
    placeholder: "Enter Feedback",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "tagIds",
    label: "Tags",
    type: "select",
    placeholder: "Select Tags",
    required: true,
    gridCols: "md:col-span-1",
    options: tagOpts,
    isMulti: true,
  },
];
