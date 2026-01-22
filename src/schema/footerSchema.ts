import { z } from "zod";

export const footerSchema = z.object({
  name: z.string().min(1, "Footer name is required"),

  value: z.string().min(1, "Footer value is required"),
});
