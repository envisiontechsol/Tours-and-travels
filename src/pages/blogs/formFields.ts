import { BlogPostResType } from "../../types/blogsTypes";
import { FormFieldConfigType } from "../../types/formsTypes";

export const getBlogFormFields = (
  formData?: BlogPostResType | null
): FormFieldConfigType[] => [
  {
    name: "postTitle",
    label: "Blog Title",
    type: "text",
    placeholder: "Enter blog title",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "blogUrl",
    label: "Blog URL",
    type: "text",
    placeholder: "enter-blog-url",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "createdBy",
    label: "Created By",
    type: "text",
    placeholder: "Enter name",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "featuredImage",
    label: "Featured Image",
    type: "file",
    previewUrl: formData?.featuredImageUrl || undefined,
    gridCols: "md:col-span-1",
  },
  {
    name: "metaTitle",
    label: "Meta Title",
    type: "text",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "metaKeyword",
    label: "Meta Keywords",
    type: "text",
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "metaDescription",
    label: "Meta Description",
    type: "textarea",
    rows: 3,
    required: true,
    gridCols: "md:col-span-1",
  },
  {
    name: "showComments",
    label: "Allow Comments",
    type: "checkbox",
    gridCols: "md:col-span-1",
  },
  {
    name: "showHome",
    label: "Show on Home Page",
    type: "checkbox",
    gridCols: "md:col-span-1",
  },
];

export const getBlogContentField = (): FormFieldConfigType => ({
  name: "content",
  label: "Blog Content",
  type: "textarea",
  rows: 6,
  placeholder: "Write blog content here...",
  required: true,
});
