import React from 'react';

import { ClipboardList } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Skeleton } from '../ui/skeleton';

interface NumberCardProps {
  title: string;
  description: string;
  count?: number;
  loading?: boolean;
}

export default function NumberCard({
  title,
  description,
  count = 0,
  loading = false,
}: NumberCardProps): React.JSX.Element {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col items-center justify-center space-y-4'>
          <div className='flex items-center justify-center size-28 my-12 rounded-full bg-primary/10'>
            {loading ? (
              <Skeleton className='size-16' />
            ) : (
              <span className='text-5xl font-bold text-primary'>{count}</span>
            )}
          </div>
          <div className='text-center flex gap-2 items-center'>
            <ClipboardList className='size-6 text-primary' />
            <p className='text-sm text-muted-foreground '>
              {loading ? (
                <Skeleton className='w-24 h-4' />
              ) : (
                `${count === 1 ? 'item' : 'items'} pending approval`
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
