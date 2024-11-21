import { Schema } from 'mongoose';

import { Sale } from '../types/Sale';

export const saleSchema = new Schema<Sale>(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);
