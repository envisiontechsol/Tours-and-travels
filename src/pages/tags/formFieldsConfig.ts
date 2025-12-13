// src/forms/config/activityFormFields.ts

import { FormFieldConfigType, OptionType } from "../../types/formsTypes";

export const getFormFieldsConfig = (
  topLevelTagOpts: OptionType[]
): FormFieldConfigType[] => [
  {
    name: "toplevel",
    label: "Top Level Tag",
    type: "select",
    placeholder: "Select category",
    required: true,
    gridCols: "md:col-span-1",
    options: topLevelTagOpts,
  },
  {
    name: "name",
    label: "Tag Name",
    type: "text",
    placeholder: "Enter tag name",
    required: true,
    gridCols: "md:col-span-1",
  },
];
