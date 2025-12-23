import { ViewFieldConfigType } from "../../types/formsTypes";
import { ReviewResType } from "../../types/reviewsTypes";

export const getViewFields = (
  data?: ReviewResType | null
): ViewFieldConfigType[] => [
  { label: "Name", key: "name" },
  { label: "Rating", key: "rating", type: "number" },
  { label: "Location", key: "location" },
  { label: "Feedback", key: "feedback" },
  {
    label: "Tags",
    key: "tags",
    type: "text",
    render: () => data?.tagLinks.map((tag) => tag.tag?.name).join(", "),
  },
];
