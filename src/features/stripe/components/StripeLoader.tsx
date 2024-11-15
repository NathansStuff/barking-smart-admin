import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

function StripeLoader(): React.JSX.Element {
  return (
    <div className='space-y-4'>
      <Skeleton className='h-10 w-full' /> {/* Card number field */}
      <div className='flex gap-4'>
        <Skeleton className='h-10 w-1/2' /> {/* Expiry date field */}
        <Skeleton className='h-10 w-1/2' /> {/* CVC field */}
      </div>
      <Skeleton className='h-10 w-full' /> {/* Submit button */}
    </div>
  );
}

export default StripeLoader;
