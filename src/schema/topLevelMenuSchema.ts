import { z } from "zod";

export const topLevelMenuSchema = z.object({
  name: z.string().min(1, "Name is required"),
  orderBy: z.number().min(1, "Order is required"),
});
