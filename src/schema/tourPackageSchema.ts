import { z } from "zod";
import { imageSizeRefine } from "../utils/functions/zodImageRefine";

// Reusable label-value schema
const labelValueSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
  info: z.string().optional(),
});

export const tourPackageSchema = z
  .object({
    name: z.string().min(1, "Package name is required"),
    code: z.string().optional(),
    url: z.string().optional(),

    priceInINR: z.number().min(0, "Price cannot be negative"),
    fakePriceInINR: z.number().optional().nullable(),

    profitMarginPct: z.number().min(0).optional(),
    hotelMarginPct: z.number().min(0).optional(),
    flightMarginPct: z.number().min(0).optional(),

    rating: z.number().min(0).max(5).optional(),
    about: z.string().min(10, "About the package is required"),

    startingCity: z.string().optional(),
    inclusionText: z.string().optional().nullable(),
    exclusionText: z.string().optional().nullable(),

    destination: labelValueSchema.refine((x) => x.label && x.value, {
      message: "Destination is required",
    }),

    packageTypeId: labelValueSchema.refine((x) => x.label && x.value, {
      message: "Package type is required",
    }),

    duration: labelValueSchema.refine((x) => x.label && x.value && x.info, {
      message: "Duration is required",
    }),

    tags: z.array(labelValueSchema).optional(),

    // FILE FIELDS
    bannerImage: z.any().optional(),
    tourImage: z.any().optional(),
    image1Url: z.any().optional(),
    image2Url: z.any().optional(),
    image3Url: z.any().optional(),

    // IMAGE TAGS
    bannerAlt: z.string().optional(),
    tourAlt: z.string().optional(),
    image1Alt: z.string().optional(),
    image2Alt: z.string().optional(),
    image3Alt: z.string().optional(),

    isActive: z.boolean(),
    selected: z.boolean(),

    hotelRatingText: z.string(),
    activitiesIncluded: z.boolean(),
    hotels3Star: z.boolean(),
    concierge24x7: z.boolean(),

    metaTitle: z.string().min(2),
    metaKeywords: z.string().min(2),
    metaDescription: z.string().min(2),
  })
  .refine(imageSizeRefine("bannerImage", 1920, 800), {
    message: "Banner image must be exactly 1920 × 800 pixels",
    path: ["bannerImage"],
  })
  .refine(imageSizeRefine("tourImage", 1024, 1024), {
    message: "Tour image must be exactly 1024 × 1024 pixels",
    path: ["tourImage"],
  })
  .refine(imageSizeRefine("image1Url", 1024, 1024), {
    message: "Image 1 must be exactly 1024 × 1024 pixels",
    path: ["image1Url"],
  })
  .refine(imageSizeRefine("image2Url", 1024, 1024), {
    message: "Image 2 must be exactly 1024 × 1024 pixels",
    path: ["image2Url"],
  })
  .refine(imageSizeRefine("image3Url", 1024, 1024), {
    message: "Image 3 must be exactly 1024 × 1024 pixels",
    path: ["image3Url"],
  })
  .refine((d) => (d.bannerImage?.length ? !!d.bannerAlt?.trim() : true), {
    message: "Banner tag is required when banner image is provided",
    path: ["bannerAlt"],
  })
  .refine((d) => (d.tourImage?.length ? !!d.tourAlt?.trim() : true), {
    message: "Tour tag is required when tour image is provided",
    path: ["tourAlt"],
  })
  .refine((d) => (d.image1Url?.length ? !!d.image1Alt?.trim() : true), {
    message: "Image 1 tag is required when image 1 is provided",
    path: ["image1Alt"],
  })
  .refine((d) => (d.image2Url?.length ? !!d.image2Alt?.trim() : true), {
    message: "Image 2 tag is required when image 2 is provided",
    path: ["image2Alt"],
  })
  .refine((d) => (d.image3Url?.length ? !!d.image3Alt?.trim() : true), {
    message: "Image 3 tag is required when image 3 is provided",
    path: ["image3Alt"],
  });
