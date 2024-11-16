'use client';

import { ReactNode } from 'react';

import AdminOnly from '@/components/container/AdminOnly';
import Logo from '@/components/general/Logo';
import NumberCard from '@/components/general/NumberCard';
import ProgressChart from '@/components/general/ProgressChart';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PROGRAMS_GOAL } from '@/data/publicInfo';
import { useGetPrograms } from '@/features/program/api/useGetPrograms';

function DashboardPage(): ReactNode {
  const allProgramsQuery = useGetPrograms();
  const pendingProgramsQuery = useGetPrograms({
    filters: { approved: false },
  });

  if (allProgramsQuery.isLoading || pendingProgramsQuery.isLoading) {
    return (
      <>
        <AdminOnly>
          <></>
          {/* <ProgramLoadingPage /> */}
        </AdminOnly>
      </>
    );
  }

  const totalPrograms = allProgramsQuery.data?.total ?? 0;
  const pendingPrograms = pendingProgramsQuery.data?.total ?? 0;

  return (
    <>
      <>
        <section className='mx-4 overflow-hidden'>
          <Card className='mx-auto mt-10 max-w-2xl text-center'>
            <CardHeader>
              <CardTitle className='text-3xl font-bold'>Dashboard</CardTitle>
              <CardDescription className='mt-2 text-gray-500'>Tracking our metrics.</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-row items-center justify-center gap-4'>
              <ProgressChart
                title='Total Programs'
                description='Number of programs created'
                metricName='Programs'
                current={totalPrograms}
                goal={PROGRAMS_GOAL}
                loading={allProgramsQuery.isLoading}
              />
              <NumberCard
                title='Pending Programs'
                description='Programs awaiting approval'
                count={pendingPrograms}
                link='/program?approved=false'
                loading={pendingProgramsQuery.isLoading}
              />
            </CardContent>
            <CardFooter className='flex flex-col items-center justify-center gap-2'>
              <Logo variant='stacked' />
            </CardFooter>
          </Card>
        </section>
      </>
    </>
  );
}

export default DashboardPage;
