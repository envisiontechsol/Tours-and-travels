import { z } from "zod";

export const blogSchema = z.object({
  postTitle: z.string().min(1, "Blog name is required"),
  blogUrl: z.string().min(1, "Blog url is required"),
  createdBy: z.string().min(1, "Created By is required"),
  showComments: z.boolean(),
  showHome: z.boolean(),
  // content: z.string().optional(),
  metaTitle: z.string().min(1, "Comments is required"),
  metaKeyword: z.string().min(1, "Comments is required"),
  metaDescription: z.string().min(1, "Comments is required"),
  featuredImage: z.any(),
});
