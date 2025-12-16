// src/forms/config/activityFormFields.ts

import { FormFieldConfigType, OptionType } from "../../types/formsTypes";
import { TourPackageResType } from "../../types/tourTypes";

export const getFormFieldsConfig = (
  isEdit: boolean,
  packagesTypesOptions: OptionType[],
  destinationOptions: OptionType[],
  durationOptions: OptionType[],
  tagsOptions: OptionType[]
): FormFieldConfigType[] => [
  {
    name: "name",
    label: "Package Name",
    type: "text",
    placeholder: "Enter package name",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "code",
    label: "Package Code",
    type: "text",
    required: !!isEdit,
    gridCols: "md:col-span-1",
    disabled: true,
  },
  {
    name: "url",
    label: "Package URL",
    type: "text",
    gridCols: "md:col-span-1",
  },
  {
    name: "priceInINR",
    label: "Price (INR)",
    type: "number",
    required: true,
  },
  {
    name: "fakePriceInINR",
    label: "Fake Price (Strike-through)",
    type: "number",
  },
  {
    name: "profitMarginPct",
    label: "Profit Margin (%)",
    type: "number",
  },
  {
    name: "flightMarginPct",
    label: "Flight Margin (%)",
    type: "number",
  },
  {
    name: "hotelMarginPct",
    label: "Hotel Margin (%)",
    type: "number",
  },
  {
    name: "rating",
    label: "Rating",
    type: "number",
  },

  {
    name: "packageTypeId",
    label: "Package Type",
    type: "select",
    options: packagesTypesOptions || [],
    required: true,
  },
  {
    name: "destination",
    label: "Destination",
    type: "select",
    options: destinationOptions,
    required: true,
    disabled: !!isEdit,
  },
  {
    name: "duration",
    label: "Duration",
    type: "select",
    options: durationOptions,
    required: true,
  },
  {
    name: "tags",
    label: "Tags",
    type: "select",
    options: tagsOptions,
    isMulti: true,
  },

  // ----- IMAGES -----
];

export const getFormFieldsConfig2 = (
  data?: TourPackageResType | null
): FormFieldConfigType[] => [
  {
    name: "bannerImage",
    label: "Banner Image (1920 x 800)",
    type: "file",
    previewUrl: data?.bannerImageUrl || undefined,
  },
  {
    name: "bannerAlt",
    label: "Banner Tag",
    type: "text",
  },
  {
    name: "tourImage",
    label: "Tour Image (1024 x 1024)",
    type: "file",
    previewUrl: data?.tourImageUrl || undefined,
  },
  {
    name: "tourAlt",
    label: "Tour Tag",
    type: "text",
  },
  {
    name: "image1Url",
    label: "Image 1 (1024 x 1024)",
    type: "file",
    previewUrl: data?.image1Url || undefined,
  },
  {
    name: "image1Alt",
    label: "Image 1 Tag",
    type: "text",
  },

  {
    name: "image2Url",
    label: "Image 2 (1024 x 1024)",
    type: "file",
    previewUrl: data?.image2Url || undefined,
  },
  {
    name: "image2Alt",
    label: "Image 2 Tag",
    type: "text",
  },
  {
    name: "image3Url",
    label: "Image 3 (1024 x 1024)",
    type: "file",
    previewUrl: data?.image3Url || undefined,
  },
  {
    name: "image3Alt",
    label: "Image 3 Tag",
    type: "text",
  },

  {
    name: "isActive",
    label: "Active",
    type: "checkbox",
  },
  {
    name: "selected",
    label: "Selected",
    type: "checkbox",
  },
  {
    name: "about",
    label: "About Package",
    type: "textarea",
    rows: 4,
    gridCols: "md:col-span-2",
  },
];
