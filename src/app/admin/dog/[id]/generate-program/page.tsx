'use client';

import { ReactNode, use } from 'react';
import React from 'react';

import Redirect from '@/components/container/Redirect';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetDog } from '@/features/dog/api/useGetDog';
import ProgramGeneration from '@/features/program/components/ProgramGeneration';

function GenerateProgramPage({ params }: { params: Promise<{ id: string }> }): ReactNode {
  const { id } = use(params);
  const dogQuery = useGetDog(id);

  return (
    <div className='container mx-auto p-4'>
      <Card>
        <CardHeader>
          <CardTitle>Generate Program</CardTitle>
          <CardDescription>Generate a program for the dog</CardDescription>
        </CardHeader>
        <CardContent>
          {dogQuery.isLoading && (
            <>
              <div className='grid grid-cols-2 gap-4'>
                {Array.from({ length: 8 }).map((_, i) => (
                  <React.Fragment key={i}>
                    <Skeleton className='h-6 w-32' />
                    <Skeleton className='h-6 w-24' />
                  </React.Fragment>
                ))}
              </div>
              <div className='mt-4'>
                <Skeleton className='mb-2 h-6 w-32' />
                <Skeleton className='h-2.5 w-full rounded-full' />
              </div>
            </>
          )}
          {!dogQuery.isLoading && dogQuery.data && <ProgramGeneration dog={dogQuery.data} />}
          {!dogQuery.isLoading && !dogQuery.data && (
            <>
              <Redirect
                href='/admin/dog'
                message='Dog not found'
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default GenerateProgramPage;
