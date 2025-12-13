import { z } from "zod";

export const packageDurationSchema = z.object({
  name: z.string().min(1, "Duration Name is required"),
  days: z.number().min(0, "Days cannot be negative"),
  nights: z.number().min(0, "Nights cannot be negative"),
});
