import { z } from "zod";

export const destinationSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    isActive: z.boolean().optional(),
    about: z.string().min(5, "Write a short description"),
    bannerImage: z.any(),
    bannerImagetage: z.string(),
  })
  .refine(
    (data) => {
      if (data?.bannerImage && data.bannerImage.length > 0) {
        return data?.bannerImagetage && data.bannerImagetage.length > 0;
      }
      return true;
    },
    {
      message: "Banner tag is required when banner image is provided",
      path: ["bannerImagetage"],
    }
  );
