import { z } from "zod";

export const metaSchema = z.object({
  metaTitle: z.string().min(1, "Meta title is required"),
  metaKeywords: z.string().min(1, "Meta keywords are required"),
  metaDescription: z.string().min(1, "Meta description is required"),
});

export type MetaValues = z.infer<typeof metaSchema>;
