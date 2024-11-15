import { store } from '@/contexts/store';

export const hasUserPurchasedProduct = (productId: string): boolean => {
  const state = store.getState();
  return state.user.oneTimePurchases?.includes(productId) ?? false;
};
