'use client';

import { ReactNode, useState } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  MAXIMUM_ENERGY,
  MINIMUM_ENERGY,
  PROGRAM_DAYS,
} from '@/constants/publicInfo';
import { DogWithId } from '@/features/dog/types/Dog';
import { calculateActivityTypeDistribution } from '@/features/dog/utils/activityTypeInfo';
import {
  calculateAgeDurationDistribution,
  calculateAgeEnergy,
} from '@/features/dog/utils/ageInfo';
import { getBreedInfo } from '@/features/dog/utils/breedInfo';
import { calculateChallengeDistribution } from '@/features/dog/utils/challengeInfo';
import { getDayDistribution } from '@/features/dog/utils/energyInfo';
import { getGenderEnergy } from '@/features/dog/utils/genderInfo';
import { getHealthIssuesEnergy } from '@/features/dog/utils/healthInfo';
import { calculateLocationDistribution } from '@/features/dog/utils/locationInfo';

import { convertDistributionToPercentages } from '../utils/convertDistributionToPercentage';
import { generateProgramRequirements } from '../utils/programRequirements';

interface ProgramGenerationProps {
  dog: DogWithId;
}

export default function ProgramGeneration({
  dog,
}: ProgramGenerationProps): ReactNode {
  const [currentDay, setCurrentDay] = useState(1);

  const breedOneInfo = getBreedInfo(dog.breedOne);
  const breedTwoInfo = dog.breedTwo ? getBreedInfo(dog.breedTwo) : null;
  const ageEnergy = calculateAgeEnergy(dog.dateOfBirth.toString());
  const healthIssuesEnergy = getHealthIssuesEnergy(dog.healthIssues);
  const genderEnergy = getGenderEnergy(dog.gender);
  const calculatedEnergy =
    breedOneInfo.energyLevel +
    (breedTwoInfo?.energyLevel || 0) +
    ageEnergy +
    healthIssuesEnergy +
    genderEnergy;

  const adjustedEnergy = Math.min(
    Math.max(calculatedEnergy, MINIMUM_ENERGY),
    MAXIMUM_ENERGY
  );

  const energyDayDistribution = getDayDistribution(adjustedEnergy);
  const durationDistribution = calculateAgeDurationDistribution(
    dog.dateOfBirth.toString()
  );
  const challengeDistribution = calculateChallengeDistribution(adjustedEnergy);
  const locationDistribution = calculateLocationDistribution(dog.location);
  const activityTypeDistribution = calculateActivityTypeDistribution(dog);

  const programRequirements = generateProgramRequirements(
    energyDayDistribution,
    durationDistribution,
    challengeDistribution,
    locationDistribution,
    activityTypeDistribution,
    PROGRAM_DAYS
  );

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>Dog Program Generation</h1>

      <Tabs
        defaultValue='energy'
        className='mb-6'
      >
        <TabsList>
          <TabsTrigger value='energy'>Energy Calculation</TabsTrigger>
          <TabsTrigger value='distributions'>Distributions</TabsTrigger>
          <TabsTrigger value='program'>Program</TabsTrigger>
        </TabsList>

        <TabsContent value='energy'>
          <Card>
            <CardHeader>
              <CardTitle>Energy Level Calculation</CardTitle>
              <CardDescription>
                Formula: Energy = Breed Energy + Age Energy + Health Energy +
                Gender Energy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-4'>
                <div className='font-semibold'>Breed One:</div>
                <div>
                  {breedOneInfo.displayName} ({breedOneInfo.energyLevel})
                </div>
                <div className='font-semibold'>Breed Two:</div>
                <div>
                  {breedTwoInfo
                    ? `${breedTwoInfo.displayName} (${breedTwoInfo.energyLevel})`
                    : 'None (0)'}
                </div>
                <div className='font-semibold'>Age Energy:</div>
                <div>{ageEnergy}</div>
                <div className='font-semibold'>Health Issues Energy:</div>
                <div>{healthIssuesEnergy}</div>
                <div className='font-semibold'>Gender Energy:</div>
                <div>{genderEnergy}</div>
                <Separator className='col-span-2 my-2' />
                <div className='font-semibold'>Calculated Energy:</div>
                <div>{calculatedEnergy}</div>
                <div className='font-semibold'>Minimum Energy:</div>
                <div>{MINIMUM_ENERGY}</div>
                <div className='font-semibold'>Maximum Energy:</div>
                <div>{MAXIMUM_ENERGY}</div>
                <Separator className='col-span-2 my-2' />
                <div className='font-semibold'>Adjusted Energy:</div>
                <div>{adjustedEnergy}</div>
              </div>
              <div className='mt-4'>
                <div className='mb-2 font-semibold'>Energy Level:</div>
                <div className='w-full bg-secondary rounded-full h-2.5'>
                  <div
                    className='bg-primary h-2.5 rounded-full'
                    style={{
                      width: `${(adjustedEnergy / MAXIMUM_ENERGY) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className='flex justify-between text-sm mt-1'>
                  <span>{MINIMUM_ENERGY}</span>
                  <span>{MAXIMUM_ENERGY}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='distributions'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {renderDistribution(
              convertDistributionToPercentages(energyDayDistribution),
              'Energy Distribution'
            )}
            {renderDistribution(durationDistribution, 'Duration Distribution')}
            {renderDistribution(
              challengeDistribution,
              'Challenge Distribution'
            )}
            {renderDistribution(locationDistribution, 'Location Distribution')}
            {renderDistribution(
              activityTypeDistribution,
              'Activity Type Distribution'
            )}
          </div>
        </TabsContent>

        <TabsContent value='program'>
          <Card>
            <CardHeader>
              <CardTitle>Program Requirements</CardTitle>
              <CardDescription>
                Day {currentDay} of {PROGRAM_DAYS}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='mb-4'>
                <div className='flex justify-between mb-2'>
                  <Button
                    onClick={() => setCurrentDay(prev => Math.max(1, prev - 1))}
                    disabled={currentDay === 1}
                  >
                    <ChevronLeft className='mr-2 h-4 w-4' /> Previous
                  </Button>
                  <Button
                    onClick={() =>
                      setCurrentDay(prev => Math.min(PROGRAM_DAYS, prev + 1))
                    }
                    disabled={currentDay === PROGRAM_DAYS}
                  >
                    Next <ChevronRight className='ml-2 h-4 w-4' />
                  </Button>
                </div>
                <Progress
                  value={(currentDay / PROGRAM_DAYS) * 100}
                  className='w-full'
                />
              </div>
              <div className='grid grid-cols-2 gap-2'>
                <div>Energy Level:</div>
                <div>
                  {programRequirements[currentDay - 1].requirements.energyLevel}
                </div>
                <div>Duration:</div>
                <div>
                  {programRequirements[currentDay - 1].requirements.duration}
                </div>
                <div>Challenge:</div>
                <div>
                  {programRequirements[currentDay - 1].requirements.challenge}
                </div>
                <div>Location:</div>
                <div>
                  {programRequirements[currentDay - 1].requirements.location}
                </div>
                <div>Activity Type:</div>
                <div>
                  {
                    programRequirements[currentDay - 1].requirements
                      .activityType
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const renderDistribution = (
  distribution: Record<string, number>,
  title: string
): ReactNode => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {Object.entries(distribution).map(([key, value]) => (
        <div
          key={key}
          className='mb-2'
        >
          <div className='flex justify-between mb-1'>
            <span>{key}</span>
            <span>{(value * 100).toFixed(0)}%</span>
          </div>
          <Progress
            value={value * 100}
            className='w-full'
          />
        </div>
      ))}
    </CardContent>
  </Card>
);
