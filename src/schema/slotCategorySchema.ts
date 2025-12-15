import { z } from "zod";

export const slotCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  isActive: z.boolean().optional(),
});
