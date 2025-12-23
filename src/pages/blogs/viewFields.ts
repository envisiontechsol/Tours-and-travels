import { ViewFieldConfigType } from "../../types/formsTypes";

export const getViewFields = (): ViewFieldConfigType[] => [
  { label: "Post Title", key: "postTitle" },
  { label: "Blog URL", key: "blogUrl" },
  { label: "Featured Image", key: "featuredImageUrl", type: "image" },
  { label: "Show Comments", key: "showComments", type: "boolean" },
  { label: "Show on Home", key: "showHome", type: "boolean" },
  { label: "Meta Title", key: "metaTitle" },
  { label: "Meta Keywords", key: "metaKeyword" },
  { label: "Meta Description", key: "metaDescription" },
  { label: "Content", key: "content" },
];
