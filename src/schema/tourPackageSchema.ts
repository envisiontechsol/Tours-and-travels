import { z } from "zod";

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
    profitMarginPct: z.number().min(0, "Margin cannot be negative").optional(),
    hotelMarginPct: z.number().min(0, "Margin cannot be negative").optional(),
    flightMarginPct: z.number().min(0, "Margin cannot be negative").optional(),
    rating: z.number().min(0).max(5).optional(),

    about: z.string().min(10, "About the package is required"),

    startingCity: z.string().optional(),

    inclusionText: z.string().optional().nullable(),
    exclusionText: z.string().optional().nullable(),

    // REQUIRED SELECTS (like your activitySchema)
    destination: labelValueSchema.refine((x) => x.label && x.value, {
      message: "Destination is required",
    }),
    packageTypeId: labelValueSchema.refine((x) => x.label && x.value, {
      message: "Destination is required",
    }),

    duration: labelValueSchema.refine((x) => x.label && x.value && x.info, {
      message: "Duration is required",
    }),

    // MULTI SELECT TAGS (similar to bannerAlt, image tags in activitySchema)
    tags: z.array(labelValueSchema).optional(),

    // FILE FIELDS
    bannerImage: z.any(),
    tourImage: z.any(),
    image1Url: z.any(),
    image2Url: z.any(),
    image3Url: z.any(),

    // IMAGE TAGS
    bannerAlt: z.string(),
    tourAlt: z.string(),

    image1Alt: z.string(),
    image2Alt: z.string(),
    image3Alt: z.string(),

    isActive: z.boolean(),
    selected: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.bannerImage && data.bannerImage.length > 0) {
        return data.bannerAlt && data.bannerAlt.trim().length > 0;
      }
      return true;
    },
    {
      message: "Banner tag is required when banner image is provided",
      path: ["bannerAlt"],
    }
  )
  .refine(
    (data) => {
      if (data.tourImage && data.tourImage.length > 0) {
        return data.tourAlt && data.tourAlt.trim().length > 0;
      }
      return true;
    },
    {
      message: "Tour tag is required when tour image is provided",
      path: ["tourAlt"],
    }
  )
  .refine(
    (data) => {
      if (data.image1Url && data.image1Url.length > 0) {
        return data.image1Alt && data.image1Alt.trim().length > 0;
      }
      return true;
    },
    {
      message: "Tour tag is required when tour image is provided",
      path: ["image1Alt"],
    }
  )
  .refine(
    (data) => {
      if (data.image2Url && data.image2Url.length > 0) {
        return data.image2Alt && data.image2Alt.trim().length > 0;
      }
      return true;
    },
    {
      message: "Tour tag is required when tour image is provided",
      path: ["image2Alt"],
    }
  )
  .refine(
    (data) => {
      if (data.image3Url && data.image3Url.length > 0) {
        return data.image3Alt && data.image3Alt.trim().length > 0;
      }
      return true;
    },
    {
      message: "Tour tag is required when tour image is provided",
      path: ["image3Alt"],
    }
  );
