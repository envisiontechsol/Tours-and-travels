import { z } from "zod";

// Schema for label-value objects
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

    bannerImage: z.any(),

    image1: z.any(),
    image2: z.any(),
    image3: z.any(),
    image4: z.any(),

    bannerTag: z.string(),
    image1Tag: z.string(),
    image2Tag: z.string(),
    image3Tag: z.string(),
    image4Tag: z.string(),

    isActive: z.boolean(),
    editable: z.boolean(),
    priceInINR: z.number().min(0, "Price is required"),
  })
  .refine(
    (data) => {
      if (data.bannerImage && data.bannerImage.length > 0) {
        return data.bannerTag && data.bannerTag.trim().length > 0;
      }
      return true;
    },
    {
      message: "Banner tag is required when banner image is provided",
      path: ["bannerTag"],
    }
  )
  .refine(
    (data) => {
      if (data.image1 && data.image1.length > 0) {
        return data.image1Tag && data.image1Tag.trim().length > 0;
      }
      return true;
    },
    {
      message: "Image 1 tag is required when image 1 is provided",
      path: ["image1Tag"],
    }
  )
  .refine(
    (data) => {
      if (data.image2 && data.image2.length > 0) {
        return data.image2Tag && data.image2Tag.trim().length > 0;
      }
      return true;
    },
    {
      message: "Image 2 tag is required when image 2 is provided",
      path: ["image2Tag"],
    }
  )
  .refine(
    (data) => {
      if (data.image3 && data.image3.length > 0) {
        return data.image3Tag && data.image3Tag.trim().length > 0;
      }
      return true;
    },
    {
      message: "Image 3 tag is required when image 3 is provided",
      path: ["image3Tag"],
    }
  )
  .refine(
    (data) => {
      if (data.image4 && data.image4.length > 0) {
        return data.image4Tag && data.image4Tag.trim().length > 0;
      }
      return true;
    },
    {
      message: "Image 4 tag is required when image 4 is provided",
      path: ["image4Tag"],
    }
  );
