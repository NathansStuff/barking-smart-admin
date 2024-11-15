import { store } from '@/contexts/store';

import { EUserRole } from '../types/EUserRole';

export function isUserAdmin(): boolean {
  const state = store.getState();
  const role = state.user.role;
  return role === EUserRole.ADMIN;
}
