import { ViewFieldConfigType } from "../../types/formsTypes";

export const getViewFields = (): ViewFieldConfigType[] => [
  { label: "Activity Title", key: "title" },
  { label: "Category", key: "categoryRef.name" },
  { label: "Description", key: "description" },
  { label: "Price (INR)", key: "priceInINR", type: "number" },
  { label: "Status", key: "isActive", type: "boolean" },
  { label: "Editable", key: "editable", type: "boolean" },
  { label: "Banner Tag", key: "bannerImagetage" },
  { label: "Banner Image", key: "bannerImageUrl", type: "image" },
  // { label: "Created At", key: "createdAt", type: "date" },
  // { label: "Updated At", key: "updatedAt", type: "date" },
];
