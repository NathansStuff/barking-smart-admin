import { ObjectId } from 'mongodb';
import { z } from 'zod';

export const Sale = z.object({
  userId: z.string(),
  productId: z.string(),
  quantity: z.number(),
  price: z.number(),
  date: z.date(),
});

export const SalePartial = Sale.partial();

export type Sale = z.infer<typeof Sale>;
export interface SaleWithId extends Sale {
  _id: ObjectId;
}
export type SalePartial = z.infer<typeof SalePartial>;
