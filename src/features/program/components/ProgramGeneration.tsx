'use client';

import { ReactNode, useState } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MAXIMUM_ENERGY, MINIMUM_ENERGY, PROGRAM_DAYS } from '@/data/publicInfo';
import { DogWithId } from '@/features/dog/types/Dog';

import { convertDistributionToPercentages } from '../utils/convertDistributionToPercentage';
import { generateProgramData } from '../utils/generateProgramData';

interface ProgramGenerationProps {
  dog: DogWithId;
}

export default function ProgramGeneration({ dog }: ProgramGenerationProps): ReactNode {
  const [currentDay, setCurrentDay] = useState(1);

  const programData = generateProgramData(dog);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-6 text-3xl font-bold'>Dog Program Generation</h1>

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
                Formula: Energy = Breed Energy + Age Energy + Health Energy + Gender Energy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-4'>
                <div className='font-semibold'>Breed One:</div>
                <div>
                  {programData.energyCalculation.breedOne.name} ({programData.energyCalculation.breedOne.energy})
                </div>
                <div className='font-semibold'>Breed Two:</div>
                <div>
                  {programData.energyCalculation.breedTwo
                    ? `${programData.energyCalculation.breedTwo.name} (${programData.energyCalculation.breedTwo.energy})`
                    : 'None (0)'}
                </div>
                <div className='font-semibold'>Age Energy:</div>
                <div>{programData.energyCalculation.ageEnergy}</div>
                <div className='font-semibold'>Health Issues Energy:</div>
                <div>{programData.energyCalculation.healthIssuesEnergy}</div>
                <div className='font-semibold'>Gender Energy:</div>
                <div>{programData.energyCalculation.genderEnergy}</div>
                <Separator className='col-span-2 my-2' />
                <div className='font-semibold'>Calculated Energy:</div>
                <div>{programData.energyCalculation.calculatedEnergy}</div>
                <div className='font-semibold'>Minimum Energy:</div>
                <div>{MINIMUM_ENERGY}</div>
                <div className='font-semibold'>Maximum Energy:</div>
                <div>{MAXIMUM_ENERGY}</div>
                <Separator className='col-span-2 my-2' />
                <div className='font-semibold'>Adjusted Energy:</div>
                <div>{programData.energyCalculation.adjustedEnergy}</div>
              </div>
              <div className='mt-4'>
                <div className='mb-2 font-semibold'>Energy Level:</div>
                <div className='h-2.5 w-full rounded-full bg-secondary'>
                  <div
                    className='h-2.5 rounded-full bg-primary'
                    style={{
                      width: `${(programData.energyCalculation.adjustedEnergy / MAXIMUM_ENERGY) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className='mt-1 flex justify-between text-sm'>
                  <span>{MINIMUM_ENERGY}</span>
                  <span>{MAXIMUM_ENERGY}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='distributions'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {renderDistribution(
              convertDistributionToPercentages(programData.distributions.energyDayDistribution),
              'Energy Distribution'
            )}
            {renderDistribution(programData.distributions.durationDistribution, 'Duration Distribution')}
            {renderDistribution(programData.distributions.challengeDistribution, 'Challenge Distribution')}
            {renderDistribution(programData.distributions.locationDistribution, 'Location Distribution')}
            {renderDistribution(programData.distributions.activityTypeDistribution, 'Activity Type Distribution')}
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
                <div className='mb-2 flex justify-between'>
                  <Button
                    onClick={() => setCurrentDay((prev) => Math.max(1, prev - 1))}
                    disabled={currentDay === 1}
                  >
                    <ChevronLeft className='mr-2 h-4 w-4' /> Previous
                  </Button>
                  <Button
                    onClick={() => setCurrentDay((prev) => Math.min(PROGRAM_DAYS, prev + 1))}
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
                <div>{programData.programRequirements[currentDay - 1].requirements.energyLevel}</div>
                <div>Duration:</div>
                <div>{programData.programRequirements[currentDay - 1].requirements.duration}</div>
                <div>Challenge:</div>
                <div>{programData.programRequirements[currentDay - 1].requirements.challenge}</div>
                <div>Location:</div>
                <div>{programData.programRequirements[currentDay - 1].requirements.location}</div>
                <div>Activity Type:</div>
                <div>{programData.programRequirements[currentDay - 1].requirements.activityType}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const renderDistribution = (distribution: Record<string, number>, title: string): ReactNode => (
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
          <div className='mb-1 flex justify-between'>
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
