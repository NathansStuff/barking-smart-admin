import connectMongo from '@/features/database/lib/mongodb';

import { Sale, SaleWithId } from '../types/Sale';

import { SaleModel } from './saleModel';

// ***** Basic CRUD *****
// Create a User
export async function createSale(sale: Sale): Promise<SaleWithId> {
  await connectMongo();
  const result = await SaleModel.create(sale);
  return result;
}

// Get a User by ID
export async function getSaleById(id: string): Promise<SaleWithId> {
  await connectMongo();
  const result = await SaleModel.findById(id);
  return result;
}

// Get all Sales
export async function getAllSales(): Promise<SaleWithId[]> {
  await connectMongo();
  const result = await SaleModel.find({});
  return result;
}

// Update a Sale
export async function updateSale(sale: SaleWithId): Promise<SaleWithId> {
  await connectMongo();
  const result = await SaleModel.findByIdAndUpdate(sale._id, sale, { new: true });
  return result;
}

// Get all sales length
export async function getTotalSales(): Promise<{ totalSales: number; totalRevenue: number }> {
  await connectMongo();
  const result = await SaleModel.aggregate([
    { $group: { _id: null, totalSales: { $sum: '$quantity' }, totalRevenue: { $sum: '$totalPrice' } } },
  ]);

  // Return default values if no sales exist
  if (!result.length) {
    return { totalSales: 0, totalRevenue: 0 };
  }

  return result[0];
}

// Get all sales by user id
export async function getSalesByUserId(userId: string): Promise<SaleWithId[]> {
  await connectMongo();
  const result = await SaleModel.find({ userId });
  return result;
}
