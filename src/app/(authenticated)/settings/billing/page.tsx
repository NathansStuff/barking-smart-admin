'use client';

import React from 'react';

import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';
import CreateSubscription from '@/features/stripe/components/CreateSubscription';
import ManageSubscription from '@/features/stripe/components/ManageSubscription';

export default function BillingPage(): React.JSX.Element {
  const user = useAppSelector(selectUser);
  const { stripeSubscriptionId } = user;

  return <>{stripeSubscriptionId ? <ManageSubscription /> : <CreateSubscription />}</>;
}
