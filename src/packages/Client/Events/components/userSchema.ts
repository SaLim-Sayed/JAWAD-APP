import { z } from 'zod';

export const groupBookingSchema = z.object({
  customerMobile: z.string({ required_error: 'Customer mobile is required' }).min(11, 'Customer mobile must be at least 11 characters').max(11, 'Customer mobile must be at most 11 characters'),
  date: z.date({ required_error: 'Select a date' }),
  startTime: z.date({ required_error: 'Select start time' }),
   service: z.string({ required_error: 'Select a service' }).default("Photo session"),
})
.superRefine((data, ctx) => {
  const now = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (data.date.toDateString() === now.toDateString() && data.startTime < now) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['startTime'],
      message: 'Start time cannot be in the past',
    });
  }

  const oneHourLater = new Date(data.startTime.getTime() + 60 * 60 * 1000);
 
});

export type GroupBookingForm = z.infer<typeof groupBookingSchema>;
