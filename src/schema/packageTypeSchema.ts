import { z } from "zod";

export const packageTypeSchema = z.object({
  name: z.string().min(1, "Package Type is required"),
});
