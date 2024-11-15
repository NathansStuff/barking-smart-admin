import React from 'react';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ProfileFormSkeleton } from '@/features/user/components/ProfileFormSkeleton';

export function ProfilePageSkeleton(): React.JSX.Element {
  return (
    <Card className='w-full max-w-2xl'>
      <CardHeader>
        <CardTitle className='text-2xl'>Profile</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex flex-col items-center justify-between gap-4 sm:flex-row md:flex-col lg:flex-row'>
          <div className='flex items-center space-x-4'>
            <Skeleton className='h-20 w-20 rounded-full' />
            <div>
              <Skeleton className='mb-2 h-6 w-32' />
              <Skeleton className='h-4 w-48' />
            </div>
          </div>
          <Skeleton className='h-10 w-40' />
        </div>

        <ProfileFormSkeleton />
      </CardContent>
    </Card>
  );
}
