import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

function ProfileFormSkeleton(): React.JSX.Element {
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[100px]' />
        <Skeleton className='h-10 w-full' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[150px]' />
        <Skeleton className='h-10 w-full' />
      </div>
      <Skeleton className='h-10 w-full' />
    </div>
  );
}

export { ProfileFormSkeleton };
