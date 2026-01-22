import { ViewFieldConfigType } from "../../types/formsTypes";
import { QuickLinkResType } from "../../types/quickLinksTypes";

export const getViewFields = (
  data?: QuickLinkResType | null,
): ViewFieldConfigType[] => [
  { label: "Name", key: "name" },
  { label: "URL", key: "url" },
  { label: "Meta Title", key: "metaTitle" },
  { label: "Meta Keywords", key: "metaKeywords" },
  {
    label: "Meta Description",
    key: "metaDescription",
    type: "text",
  },
  {
    label: "Tags",
    key: "tags",
    type: "text",
    render: () => data?.tags?.map((tag) => tag.name).join(", ") || "-",
  },
];
