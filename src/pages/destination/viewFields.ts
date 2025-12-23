// destinationViewFields.ts

import { ViewFieldConfigType } from "../../types/formsTypes";

export const viewFields: ViewFieldConfigType[] = [
  { label: "Destination Name", key: "name" },
  { label: "Slug", key: "slug" },
  { label: "Top 10 Rank", key: "top10Rank", type: "number" },
  { label: "Status", key: "isActive", type: "boolean" },
  { label: "Banner Tag", key: "bannerImageTag" },
  { label: "About", key: "about" },
  { label: "Banner Image", key: "bannerImageUrl", type: "image" },
];
