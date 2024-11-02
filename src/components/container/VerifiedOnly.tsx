'use client';

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';
import { EUserRole } from '@/features/user/types/EUserRole';

function VerifedOnly(): React.JSX.Element {
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const { role } = user;
  // Accept if user and role is user or admin
  const isAllowed =
    user && (role === EUserRole.USER || role === EUserRole.ADMIN);

  useEffect(() => {
    if (!isAllowed) {
      console.log('🔒 User not verified, waiting 1 second before redirect...');
      const timeoutId = setTimeout(() => {
        // Use the current user state from closure
        if (!isAllowed) {
          console.log('🔒 User still not verified after delay, redirecting...');
          router.push('/');
        } else {
          console.log('✅ User verified during delay, canceling redirect');
        }
      }, 1000);

      return () => clearTimeout(timeoutId);
    } else {
      console.log('✅ User verified, access granted');
    }
  }, [user, isAllowed, router]);
  return <></>;
}

export default VerifedOnly;
