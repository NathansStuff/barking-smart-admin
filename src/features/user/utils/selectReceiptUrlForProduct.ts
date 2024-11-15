import { store } from '@/contexts/store';

export const selectReceiptUrlForProduct = (productId: string): string | undefined => {
  const state = store.getState();
  const purchaseIndex = state.user.oneTimePurchases?.indexOf(productId) ?? -1;
  return purchaseIndex !== -1 ? state.user.receiptUrls?.[purchaseIndex] : undefined;
};
