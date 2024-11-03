'use client';

import { ReactNode } from 'react';

import { useSearchParams } from 'next/navigation';

import VerifedOnly from '@/components/container/VerifiedOnly';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ProgramForm from '@/features/program/components/ProgramForm';
import { EActivityType } from '@/features/program/types/EActivityType';
import { EChallenge } from '@/features/program/types/EChallenge';
import { EDuration } from '@/features/program/types/EDuration';
import { ELocation } from '@/features/program/types/ELocation';
import { ESpace } from '@/features/program/types/ESpace';

function CreateProgramPage(): ReactNode {
  const searchParams = useSearchParams();

  // Parse URL parameters
  const initialData = {
    tags: {
      location:
        (searchParams.get('location') as ELocation) || ELocation.INDOORS,
      energyLevel: parseInt(searchParams.get('energy') || '1'),
      duration: (searchParams.get('duration') as EDuration) || EDuration.LONG,
      type: (searchParams.get('types')?.split(',') || []) as EActivityType[],
      space: (searchParams.get('space') as ESpace) || ESpace.LARGE,
      challenge:
        (searchParams.get('challenge') as EChallenge) || EChallenge.EASY,
    },
  };

  return (
    <>
      <VerifedOnly />
      <div className='container mx-auto p-4'>
        <Card>
          <CardHeader>
            <CardTitle>Create Program</CardTitle>
            <CardDescription>Create a new program</CardDescription>
          </CardHeader>
          <CardContent>
            <ProgramForm initialData={initialData} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default CreateProgramPage;
