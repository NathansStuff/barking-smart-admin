import React from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function ProgramLoadingPage(): React.JSX.Element {
  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <Skeleton className="h-8 w-48" /> {/* Title */}
          <Skeleton className="mt-2 h-4 w-64" /> {/* Description */}
        </CardHeader>
        <CardContent>
          {/* Program Form Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" /> {/* Title input */}
            <Skeleton className="h-10 w-full" /> {/* Descriptor select */}
            <Skeleton className="h-10 w-full" /> {/* Tags select */}
            <Skeleton className="h-32 w-full" /> {/* Description textarea */}
            <Skeleton className="h-10 w-full" /> {/* Icon select */}
            <Skeleton className="h-10 w-full" /> {/* Canvas Link */}
            <Skeleton className="h-10 w-full" /> {/* PDF Link */}
            <Skeleton className="h-10 w-full" /> {/* Submit button */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProgramLoadingPage;
