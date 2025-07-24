import { z } from 'zod';


export const groupBookingSchema = z.object({
  date: z.date({ required_error: 'Select a date' }),
  startTime: z.date({ required_error: 'Select start time' }),
  endTime: z.date({ required_error: 'Select end time' }),
  service: z.string({ required_error: 'Select a service' }).default("Photo session"),
 
});

export type GroupBookingForm = z.infer<typeof groupBookingSchema>;