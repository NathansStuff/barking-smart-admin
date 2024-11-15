'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { EUserRole } from '@/features/user/types/EUserRole';

function AdminOnly({ children }: { children: React.ReactNode }): React.JSX.Element | null {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true);
    } else if (session?.user?.role !== EUserRole.ADMIN) {
      router.push('/');
    } else {
      setIsLoading(false);
    }
  }, [session, status, router]);

  if (isLoading) return <p>Loading...</p>; // Optionally add a loader component here

  return <>{children}</>;
}

export default AdminOnly;
