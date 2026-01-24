import { z } from "zod";

export const horseSchema = z.object({
  images: z
    .array(
      z.object({
        uri: z.string(),
        name: z.string(),
        type: z.string(),
      })
    )
    .min(1, "At least one image is required"),

  enName: z.string().min(1, "English name is required"),
  arName: z.string().min(1, "Arabic name is required"),
  enDescription: z.string().min(1, "English description is required"),
  arDescription: z.string().min(1, "Arabic description is required"),
  enGender: z.string().min(1, "English gender is required"),
  arGender: z.string().min(1, "Arabic gender is required"),
  enPrice: z.string().min(1, "English price is required"),
  arPrice: z.string().min(1, "Arabic price is required"),
  enLevel: z.string().min(1, "English level is required"),
  arLevel: z.string().min(1, "Arabic level is required"),
  enType: z.string().min(1, "English type is required"),
  arType: z.string().min(1, "Arabic type is required"),
  enFeature: z.string().min(1, "English feature is required"),
  arFeature: z.string().min(1, "Arabic feature is required"),
  color: z.string().min(1, "Color is required"),
  video: z.string().optional(),
});

export type HorseForm = z.infer<typeof horseSchema>;
