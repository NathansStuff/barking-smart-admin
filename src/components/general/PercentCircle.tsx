import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

interface PercentCircleProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  strokeWidth?: number;
  className?: string;
  loading?: boolean;
  variant?: 'default' | 'warning';
}

export default function PercentCircle({
  value,
  size = 'md',
  strokeWidth = 12,
  className = '',
  loading = false,
  variant = 'default',
}: PercentCircleProps): React.JSX.Element {
  // Ensure value is between 0 and 100
  const progress = Math.min(Math.max(value, 0), 100);

  // Size configurations
  const sizes = {
    sm: {
      svgSize: 'w-32 h-32',
      center: 64,
      radius: 40,
      fontSize: 'text-2xl',
    },
    md: {
      svgSize: 'w-48 h-48',
      center: 96,
      radius: 60,
      fontSize: 'text-4xl',
    },
    lg: {
      svgSize: 'w-64 h-64',
      center: 128,
      radius: 80,
      fontSize: 'text-5xl',
    },
  };

  const { svgSize, center, radius, fontSize } = sizes[size];
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const strokeColor = variant === 'warning' ? 'stroke-yellow-500' : 'stroke-primary';

  if (loading) {
    return (
      <div className={`relative ${className}`}>
        <div className={svgSize}>
          <Skeleton className='h-full w-full rounded-full' />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <svg className={`${svgSize} -rotate-90`}>
        {/* Background circle */}
        <circle
          className='text-muted-foreground/20'
          strokeWidth={strokeWidth}
          stroke='currentColor'
          fill='none'
          r={radius}
          cx={center}
          cy={center}
        />
        {/* Progress circle */}
        <circle
          className={`${strokeColor} transition-all duration-300 ease-in-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap='round'
          stroke='currentColor'
          fill='none'
          r={radius}
          cx={center}
          cy={center}
        />
      </svg>
      <div className='absolute inset-0 flex items-center justify-center'>
        <span className={`${fontSize} font-bold`}>{progress}%</span>
      </div>
    </div>
  );
}
