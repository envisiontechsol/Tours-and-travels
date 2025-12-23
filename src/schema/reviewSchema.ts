import { z } from "zod";

const labelValueSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
});

export const reviewSchema = z.object({
  name: z.string().min(1, "Review name is required"),
  // tagIds: labelValueSchema.refine((data) => data.label && data.value, {
  //   message: "Tags is required",
  // }),
  tagIds: z.array(labelValueSchema),
  rating: z.number().min(0, "Rating is required"),
  location: z.string().min(1, "Location name is required"),
  feedback: z.string().min(1, "Feedback name is required"),
});
