import { ReactNode } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

export function DogFormSkeleton(): ReactNode {
  return (
    <div className='space-y-6'>
      {/* Submit Button */}
      <div className='flex gap-2 items-center'>
        <Skeleton className='h-10 w-40' />
      </div>

      {/* Basic Information */}
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-16' /> {/* Name label */}
          <Skeleton className='h-10 w-full' /> {/* Name input */}
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-24' /> {/* Date of Birth label */}
          <Skeleton className='h-10 w-full' /> {/* Date input */}
        </div>
      </div>

      {/* Breed Information */}
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-24' /> {/* Primary Breed label */}
          <Skeleton className='h-10 w-full' /> {/* Breed select */}
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-32' /> {/* Secondary Breed label */}
          <Skeleton className='h-10 w-full' /> {/* Breed select */}
        </div>
      </div>

      {/* Additional Information */}
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-16' /> {/* Gender label */}
          <Skeleton className='h-10 w-full' /> {/* Gender select */}
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-20' /> {/* Location label */}
          <Skeleton className='h-10 w-full' /> {/* Location select */}
        </div>
      </div>

      {/* Health and Characteristics */}
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-24' /> {/* Health Issues label */}
          <Skeleton className='h-10 w-full' /> {/* Health select */}
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-20' /> {/* Weight label */}
          <Skeleton className='h-10 w-full' /> {/* Weight input */}
        </div>
      </div>

      {/* Activity Level */}
      <div className='space-y-2'>
        <Skeleton className='h-4 w-32' /> {/* Activity Level label */}
        <Skeleton className='h-10 w-full' /> {/* Activity input */}
      </div>

      {/* Toggles */}
      <div className='grid grid-cols-3 gap-4'>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className='flex items-center gap-2'
          >
            <Skeleton className='h-4 w-24' /> {/* Toggle label */}
            <Skeleton className='h-6 w-10' /> {/* Toggle switch */}
          </div>
        ))}
      </div>

      {/* Bio */}
      <div className='space-y-2'>
        <Skeleton className='h-4 w-12' /> {/* Bio label */}
        <Skeleton className='h-32 w-full' /> {/* Bio textarea */}
      </div>

      {/* Profile Image Upload */}
      <div className='space-y-2'>
        <Skeleton className='h-4 w-24' /> {/* Profile Image label */}
        <Skeleton className='h-32 w-32 rounded-lg' /> {/* Image preview */}
        <Skeleton className='h-24 w-full' /> {/* Upload zone */}
      </div>

      {/* Submit Button */}
      <Skeleton className='h-10 w-full' />
    </div>
  );
}
