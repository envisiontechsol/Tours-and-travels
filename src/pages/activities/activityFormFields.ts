// src/forms/config/activityFormFields.ts

import { ActivityResType } from "../../types/activityTypes";
import { FormFieldConfigType, OptionType } from "../../types/formsTypes";

export const getActivityFormFields = (
  categoryOptions: OptionType[],
  destinationOptions: OptionType[],
  formData?: ActivityResType | null
): FormFieldConfigType[] => [
  {
    name: "title",
    label: "Activity Name",
    type: "text",
    placeholder: "Enter activity name",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    placeholder: "Select category",
    required: true,
    gridCols: "md:col-span-1",
    options: categoryOptions,
  },
  {
    name: "destination",
    label: "Destination",
    type: "select",
    placeholder: "Select destination",
    required: true,
    gridCols: "md:col-span-1",
    options: destinationOptions,
  },
  {
    name: "priceInINR",
    label: "Price (INR)",
    type: "number",
    placeholder: "Enter price",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "bannerImage",
    label: "Banner Image",
    type: "file",
    previewUrl: formData?.bannerImageUrl || undefined,
    gridCols: "md:col-span-1",
  },
  {
    name: "bannerTag",
    label: "Banner Tag",
    type: "text",
    placeholder: "Enter tag",
    gridCols: "md:col-span-1",
  },
  {
    name: "image1",
    label: "Image 1",
    type: "file",
    previewUrl: formData?.image1Url || undefined,
    gridCols: "md:col-span-1",
  },
  {
    name: "image1Tag",
    label: "Image 1 Tag",
    gridCols: "md:col-span-1",
    type: "text",
    placeholder: "Enter tag",
  },
  {
    name: "image2",
    label: "Image 2",
    type: "file",
    previewUrl: formData?.image2Url || undefined,
    gridCols: "md:col-span-1",
  },
  {
    name: "image2Tag",
    label: "Image 2 Tag",
    gridCols: "md:col-span-1",
    type: "text",
    placeholder: "Enter tag",
  },
  {
    name: "image3",
    label: "Image 3",
    type: "file",
    previewUrl: formData?.image3Url || undefined,
    gridCols: "md:col-span-1",
  },
  {
    name: "image3Tag",
    label: "Image 3 Tag",
    gridCols: "md:col-span-1",
    type: "text",
    placeholder: "Enter tag",
  },
  {
    name: "image4",
    label: "Image 4",
    type: "file",
    previewUrl: formData?.image4Url || undefined,
    gridCols: "md:col-span-1",
  },
  {
    name: "image4Tag",
    label: "Image 4 Tag",
    gridCols: "md:col-span-1",
    type: "text",
    placeholder: "Enter tag",
  },
  {
    name: "isActive",
    label: "Active",
    type: "checkbox",
    gridCols: "md:col-span-1",
  },
  {
    name: "editable",
    label: "Editable",
    type: "checkbox",
    gridCols: "md:col-span-1",
  },
];

export const getActivitydescriptionField = (): FormFieldConfigType => ({
  name: "description",
  label: "Description",
  type: "textarea",
  placeholder: "Write about this activity",
  rows: 4,
});
