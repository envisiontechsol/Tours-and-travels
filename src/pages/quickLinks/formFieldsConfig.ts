import { FormFieldConfigType, OptionType } from "../../types/formsTypes";

export const getFormFieldsConfig = (
  tagOpts: OptionType[],
): FormFieldConfigType[] => [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter Quick Link Name",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "url",
    label: "URL",
    type: "text",
    placeholder: "Enter URL",
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
  {
    name: "metaTitle",
    label: "Meta Title",
    type: "text",
    placeholder: "Enter Meta Title",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "metaKeywords",
    label: "Meta Keywords",
    type: "text",
    placeholder: "Enter Meta Keywords",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "metaDescription",
    label: "Meta Description",
    type: "textarea",
    placeholder: "Enter Meta Description",
    required: true,
    gridCols: "md:col-span-2",
  },
];
