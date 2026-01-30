import { z } from "zod";

const labelValueSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
});

export const footerSchema = z.object({
  name: z.string().min(1, "Footer name is required"),

  value: z.string().min(1, "Footer value is required"),

  type: labelValueSchema.refine((data) => data.label && data.value, {
    message: "Type is required",
  }),
});
