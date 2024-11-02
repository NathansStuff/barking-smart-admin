'use client';

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';
import { EUserRole } from '@/features/user/types/EUserRole';

function AdminOnly(): React.JSX.Element {
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const { role } = user;
  // Accept if user and is admin
  const isAllowed = user && role === EUserRole.ADMIN;

  useEffect(() => {
    if (!isAllowed) {
      router.push('/');
    }
  }, [user, isAllowed, router]);
  return <></>;
}

export default AdminOnly;
