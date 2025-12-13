// src/forms/config/activityFormFields.ts

import { FormFieldConfigType } from "../../types/formsTypes";

export const getPDFormFields = (): FormFieldConfigType[] => [
  {
    name: "name",
    label: "Duration Name",
    type: "text",
    placeholder: "Enter duration name (e.g., 3D/2N)",
    required: true,
    gridCols: "md:col-span-2",
  },
  {
    name: "days",
    label: "Days",
    type: "number",
    placeholder: "Enter number of days",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "nights",
    label: "Nights",
    type: "number",
    placeholder: "Enter number of nights",
    required: true,
    gridCols: "md:col-span-1",
  },
];
