import { z } from 'zod';

export const cardPaymentSchema = z.object({
  cardHolder: z
    .string()
    .min(2, 'Card holder name is required')
    .max(100, 'Card holder name is too long'),
  cardNumber: z
    .string()
   ,
  expireDate: z
    .string()
   ,
  cvv: z
    .string()
   ,
});

export type CardPaymentForm = z.infer<typeof cardPaymentSchema>;