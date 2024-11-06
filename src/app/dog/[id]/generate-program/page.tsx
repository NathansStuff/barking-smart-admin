'use client';

import { ReactNode } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useGetDog } from '@/features/dog/api/useGetDog';
import ProgramGeneration from '@/features/program/components/ProgramGeneration';

function GenerateProgramPage({
  params,
}: {
  params: { id: string };
}): ReactNode {
  const dogQuery = useGetDog(params.id);

  if (!dogQuery.data) {
    return <div>Dog not found</div>;
  }

  return (
    <div className='container mx-auto p-4'>
      <Card>
        <CardHeader>
          <CardTitle>Generate Program</CardTitle>
          <CardDescription>Generate a program for the dog</CardDescription>
        </CardHeader>
        <CardContent>
          <ProgramGeneration dog={dogQuery.data} />
        </CardContent>
      </Card>
    </div>
  );
}

export default GenerateProgramPage;
