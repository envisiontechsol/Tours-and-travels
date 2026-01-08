import { z } from "zod";
import { imageSizeRefine } from "../utils/functions/zodImageRefine";

export const destinationSchema = z
  .object({
    name: z.string().min(2),
    isActive: z.boolean().optional(),
    about: z.string().min(5),

    bannerImage: z.any().optional(),
    bannerImagetage: z.string().optional(),

    top10Rank: z.number().min(1),
    metaTitle: z.string().min(2),
    metaKeywords: z.string().min(2),
    metaDescription: z.string().min(2),
    travelInsuranceIncluded: z.boolean().optional(),
    visaInformationHtml: z.string().optional(),
    insurancePriceInINR: z.number().min(1),
  })
  .refine(imageSizeRefine("bannerImage", 1920, 800), {
    message: "Banner image must be exactly 1920 × 800 pixels",
    path: ["bannerImage"],
  })
  .refine(
    (data) =>
      data?.bannerImage?.length ? !!data.bannerImagetage?.trim() : true,
    {
      message: "Banner tag is required when banner image is provided",
      path: ["bannerImagetage"],
    }
  );
