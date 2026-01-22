import { z } from "zod";

const labelValueSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
});

export const quickLinkSchema = z.object({
  name: z.string().min(1, "Quick link name is required"),

  url: z.string().min(1, "URL is required"),

  metaTitle: z.string().min(1, "Meta title is required"),

  metaKeywords: z.string().min(1, "Meta keywords are required"),

  metaDescription: z.string().min(1, "Meta description is required"),

  tourPackageIds: z
    .array(labelValueSchema)
    .min(1, "At least one tag is required"),
});
