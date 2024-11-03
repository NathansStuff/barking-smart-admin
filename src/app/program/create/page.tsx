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
import { EEnergyLevel } from '@/features/program/types/EEnergyLevel';
import { ELocation } from '@/features/program/types/ELocation';
import { ESpace } from '@/features/program/types/ESpace';
import { energyLevelToNumeric } from '@/features/program/utils/determineEnergyLevel';

function CreateProgramPage(): ReactNode {
  const searchParams = useSearchParams();
  const energyLevel =
    (searchParams.get('energyLevel') as EEnergyLevel) || EEnergyLevel.LOW;
  const [min, max] = energyLevelToNumeric(energyLevel);
  const energyLevelValue = Math.floor(Math.random() * (max - min + 1)) + min;

  // Helper function to get random enum value
  const getRandomEnumValue = <T,>(enumObj: { [key: string]: T }): T => {
    const enumValues = Object.values(enumObj);
    return enumValues[Math.floor(Math.random() * enumValues.length)];
  };

  // Helper function to get random array of enum values
  const getRandomEnumArray = <T,>(enumObj: { [key: string]: T }, minItems: number = 1): T[] => {
    const enumValues = Object.values(enumObj);
    const numItems = Math.floor(Math.random() * (enumValues.length - minItems + 1)) + minItems;
    const shuffled = [...enumValues].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, numItems);
  };

  // Parse URL parameters
  const initialData = {
    tags: {
      location: (searchParams.get('location') as ELocation) || getRandomEnumValue(ELocation),
      energyLevel: energyLevelValue,
      duration: (searchParams.get('duration') as EDuration) || getRandomEnumValue(EDuration),
      type: searchParams.get('type')?.split(',') as EActivityType[] || getRandomEnumArray(EActivityType),
      space: (searchParams.get('space') as ESpace) || getRandomEnumValue(ESpace),
      challenge: (searchParams.get('challenge') as EChallenge) || getRandomEnumValue(EChallenge),
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
