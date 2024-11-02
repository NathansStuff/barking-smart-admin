import { ReactNode } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

export function AdminSkeleton(): ReactNode {
  return (
    <section className='mx-4 overflow-hidden'>
      <div className='mx-auto mt-10 max-w-3xl text-left rounded-lg border bg-card'>
        {/* Table skeleton */}
        <div className='p-4'>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className='grid grid-cols-4 gap-4 py-4 border-t first:border-t-0'
            >
              <Skeleton className='h-8' />
              <Skeleton className='h-8' />
              <Skeleton className='h-8' />
              <Skeleton className='h-8' />
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className='p-4 border-t'>
          <div className='flex items-center justify-between'>
            <Skeleton className='h-8 w-[250px]' />
            <Skeleton className='h-8 w-[100px]' />
          </div>
        </div>
      </div>
    </section>
  );
}
