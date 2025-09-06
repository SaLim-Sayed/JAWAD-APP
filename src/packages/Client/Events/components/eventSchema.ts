import { z } from "zod";

export const eventSchema = z.object({
  image: z
    .array(
      z.object({
        uri: z.string(),
        name: z.string(),
        type: z.string(),
      })
    )
    .min(1, "An event image is required"),

  enName: z.string().min(1, "English name is required"),
  arName: z.string().min(1, "Arabic name is required"),

  enDescription: z.string().min(1, "English description is required"),
  arDescription: z.string().min(1, "Arabic description is required"),

  arCity: z.string().optional(),
  enCity: z.string().optional(),

  enRegion: z.string().min(1, "English region is required"),
  arRegion: z.string().min(1, "Arabic region is required"),

  enAddress: z.string().min(1, "English address is required"),
  arAddress: z.string().min(1, "Arabic address is required"),

  date: z.string().min(1, "Select a date"),
  location: z.string().min(1, "Location is required"),
  price: z.string().min(1, "Price is required"),
});

export type EventForm = z.infer<typeof eventSchema>;
