import { z } from 'zod';

export const groupBookingSchema = z.object({
  type: z.enum(['my', 'group']),
  riders: z.string().min(1, 'Required'),
  gender: z.enum(['male', 'female', 'mixed'], { required_error: 'Select gender' }),
  nationality: z.string().nonempty('Select nationality'),
  promo: z.string().optional(),
});

export type GroupBookingForm = z.infer<typeof groupBookingSchema>;
