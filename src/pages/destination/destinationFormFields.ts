// src/forms/config/activityFormFields.ts

import { FormFieldConfigType } from "../../types/formsTypes";
import { DestinationResType } from "../../types/locationTypes";

export const getDestinationFormFields = (
  formData?: DestinationResType | null
): FormFieldConfigType[] => [
  {
    name: "name",
    label: "Destination Name",
    type: "text",
    placeholder: "Enter destination name",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "isActive",
    label: "Active",
    type: "checkbox",
    gridCols: "md:col-span-1 self-end",
  },
  {
    name: "bannerImage",
    label: "Banner Image (1920 x 800)",
    type: "file",
    previewUrl: formData?.bannerImageUrl || undefined,
    gridCols: "md:col-span-1",
  },
  {
    name: "bannerImagetage",
    label: "Banner Tag",
    type: "text",
    placeholder: "Enter tag",
    gridCols: "md:col-span-1",
  },
  {
    name: "top10Rank",
    label: "Order By",
    type: "number",
    placeholder: "Enter number",
    gridCols: "md:col-span-1",
  },
  {
    name: "travelInsuranceIncluded",
    label: "Travel Insurance Included",
    type: "checkbox",
    gridCols: "md:col-span-1 self-end",
  },
  {
    name: "insurancePriceInINR",
    label: "Insurance Price (INR)",
    type: "number",
    placeholder: "Enter insurance price",
    required: true,
    gridCols: "md:col-span-1",
  },

  // {
  //   name: "visaInformationHtml",
  //   label: "Visa Information",
  //   type: "textarea",
  //   placeholder: "Enter visa information",
  //   gridCols: "md:col-span-2",
  // },
];

export const getDestinationAboutField = (): FormFieldConfigType => ({
  name: "about",
  label: "About",
  type: "textarea",
  placeholder: "Write about this destination",
  required: true,
  rows: 4,
});

export const getMetaFields = (): FormFieldConfigType[] => [
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
    placeholder: "Enter meta keywords (comma separated)",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "metaDescription",
    label: "Meta Description",
    type: "textarea",
    placeholder: "Enter meta description",
    required: true,
    gridCols: "md:col-span-2",
  },
];
