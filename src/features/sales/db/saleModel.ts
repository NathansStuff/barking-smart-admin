import { model, models } from 'mongoose';

import { Sale } from '../types/Sale';

import { saleSchema } from './saleSchema';

export const SaleModel = models.Sale || model<Sale>('Sale', saleSchema);
