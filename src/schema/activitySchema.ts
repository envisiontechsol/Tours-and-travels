import { z } from "zod";
import { imageSizeRefine } from "../utils/functions/zodImageRefine";

const labelValueSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
});

export const activitySchema = z
  .object({
    title: z.string().min(1, "Activity name is required"),

    category: labelValueSchema.refine((data) => data.label && data.value, {
      message: "Category is required",
    }),

    destination: labelValueSchema.refine((data) => data.label && data.value, {
      message: "Destination is required",
    }),

    description: z.string(),

    bannerImage: z.any().optional(),

    image1: z.any().optional(),
    image2: z.any().optional(),
    image3: z.any().optional(),
    image4: z.any().optional(),

    bannerTag: z.string().optional(),
    image1Tag: z.string().optional(),
    image2Tag: z.string().optional(),
    image3Tag: z.string().optional(),
    image4Tag: z.string().optional(),

    isActive: z.boolean(),
    editable: z.boolean(),
    priceInINR: z.number().min(0, "Price is required"),
  })

  /* ---------- IMAGE SIZE VALIDATION ---------- */

  .refine(imageSizeRefine("bannerImage", 1920, 800), {
    message: "Banner image must be exactly 1920 × 800 pixels",
    path: ["bannerImage"],
  })

  .refine(imageSizeRefine("image1", 1024, 1024), {
    message: "Image 1 must be exactly 1024 × 1024 pixels",
    path: ["image1"],
  })

  .refine(imageSizeRefine("image2", 1024, 1024), {
    message: "Image 2 must be exactly 1024 × 1024 pixels",
    path: ["image2"],
  })

  .refine(imageSizeRefine("image3", 1024, 1024), {
    message: "Image 3 must be exactly 1024 × 1024 pixels",
    path: ["image3"],
  })

  .refine(imageSizeRefine("image4", 1024, 1024), {
    message: "Image 4 must be exactly 1024 × 1024 pixels",
    path: ["image4"],
  })

  /* ---------- TAG REQUIRED IF IMAGE EXISTS ---------- */

  .refine(
    (data) => (data?.bannerImage?.length ? !!data.bannerTag?.trim() : true),
    {
      message: "Banner tag is required when banner image is provided",
      path: ["bannerTag"],
    }
  )

  .refine((data) => (data?.image1?.length ? !!data.image1Tag?.trim() : true), {
    message: "Image 1 tag is required when image 1 is provided",
    path: ["image1Tag"],
  })

  .refine((data) => (data?.image2?.length ? !!data.image2Tag?.trim() : true), {
    message: "Image 2 tag is required when image 2 is provided",
    path: ["image2Tag"],
  })

  .refine((data) => (data?.image3?.length ? !!data.image3Tag?.trim() : true), {
    message: "Image 3 tag is required when image 3 is provided",
    path: ["image3Tag"],
  })

  .refine((data) => (data?.image4?.length ? !!data.image4Tag?.trim() : true), {
    message: "Image 4 tag is required when image 4 is provided",
    path: ["image4Tag"],
  });
