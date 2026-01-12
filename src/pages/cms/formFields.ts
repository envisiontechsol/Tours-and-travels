import { FormFieldConfigType } from "../../types/formsTypes";

export const metaFields: FormFieldConfigType[] = [
  {
    name: "metaTitle",
    label: "Meta Title",
    type: "text",
    placeholder: "Enter meta title",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "metaKeywords",
    label: "Meta Keywords",
    type: "text",
    placeholder: "Enter keywords seperated by comma",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "metaDescription",
    label: "Meta Description",
    type: "textarea",
    placeholder: "Short description",
    required: true,
    gridCols: "md:col-span-2",
  },
];
