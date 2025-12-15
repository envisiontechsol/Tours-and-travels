// src/forms/config/activityFormFields.ts

import { FormFieldConfigType } from "../../types/formsTypes";

export const getFormFieldsConfig = (): FormFieldConfigType[] => [
  {
    name: "name",
    label: "Category Name",
    type: "text",
    placeholder: "Enter Category name",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "isActive",
    label: "Active",
    type: "checkbox",
    gridCols: "md:col-span-1 self-end",
  },
];
