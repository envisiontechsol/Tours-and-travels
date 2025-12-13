import { z } from "zod";
const labelValueSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
});
export const tagSchema = z.object({
  name: z.string().min(1, "Package Type is required"),
  // toplevel: z.string().min(1, "Package Type is required"),
  toplevel: labelValueSchema.refine((data) => data.label && data.value, {
    message: "Package Type is required",
  }),
});
