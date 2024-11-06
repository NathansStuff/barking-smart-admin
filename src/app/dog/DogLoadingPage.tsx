import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function DogLoadingPage(): React.JSX.Element {
  return (
    <div className='container mx-auto p-4'>
      <Card>
        <CardContent>
          {/* Filters Section */}
          <div className='space-y-4 p-4'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
              <Skeleton className='h-10 w-full' /> {/* Name input */}
              <Skeleton className='h-10 w-full' /> {/* Breed select */}
              <Skeleton className='h-10 w-full' /> {/* Gender select */}
              <Skeleton className='h-10 w-full' /> {/* Location select */}
            </div>
            <Skeleton className='h-10 w-full' /> {/* Clear filters button */}
          </div>

          {/* Table Header */}
          <div className='px-4'>
            <div className='grid grid-cols-7 gap-4'>
              {[...Array(7)].map((_, index) => (
                <Skeleton
                  key={index}
                  className='h-8 w-full'
                />
              ))}
            </div>
          </div>

          {/* Table Rows */}
          <div className='px-4 py-2'>
            {[...Array(5)].map((_, rowIndex) => (
              <div
                key={rowIndex}
                className='grid grid-cols-7 gap-4 py-2'
              >
                {[...Array(7)].map((_, colIndex) => (
                  <Skeleton
                    key={colIndex}
                    className='h-6 w-full'
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className='p-4'>
            <div className='flex justify-between items-center'>
              <Skeleton className='h-8 w-32' /> {/* Page size selector */}
              <div className='flex gap-2'>
                <Skeleton className='h-8 w-24' /> {/* Page info */}
                <Skeleton className='h-8 w-32' /> {/* Page navigation */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default DogLoadingPage;
