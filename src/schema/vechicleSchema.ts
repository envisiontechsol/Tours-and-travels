import { z } from "zod";
import { imageSizeRefine } from "../utils/functions/zodImageRefine";

export const vehicleSchema = z
  .object({
    name: z.string().min(2),
    numberSeats: z.number().min(1),
    description: z.string().min(5, "Minimum 5 charaters required"),
    vehicleImage: z.any().optional(),
  })
  .refine(imageSizeRefine("vehicleImage", 1024, 1024), {
    message: "Vehicle image must be exactly 1024 × 1024 pixels",
    path: ["vehicleImage"],
  });
