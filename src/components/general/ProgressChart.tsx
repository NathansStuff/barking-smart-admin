'use client';
import React from 'react';

import PercentCircle from '@/components/general/PercentCircle';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Skeleton } from '../ui/skeleton';

interface ProgressChartProps {
  current?: number;
  goal?: number;
  title: string;
  description: string;
  metricName: string;
  loading?: boolean;
  variant?: 'default' | 'warning';
}

export default function ProgressChart({
  current = 75,
  goal = 100,
  title,
  description,
  metricName,
  loading = false,
  variant = 'default',
}: ProgressChartProps):React.JSX.Element {
  const progress = Math.min(Math.round((current / goal) * 100), 100);

  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col items-center'>
        <PercentCircle
          value={progress}
          size='md'
          loading={loading}
          variant={variant}
        />
        <div className='mt-4 text-center'>
          <p className='text-sm text-muted-foreground'>
            Current {metricName}:{' '}
            {loading ? (
              <Skeleton className='inline-block w-8 h-4 align-middle' />
            ) : (
              <span className='font-medium text-foreground'>{current}</span>
            )}
          </p>
          <p className='text-sm text-muted-foreground'>
            Goal:{' '}
            {loading ? (
              <Skeleton className='inline-block w-8 h-4 align-middle' />
            ) : (
              <span className='font-medium text-foreground'>{goal}</span>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
