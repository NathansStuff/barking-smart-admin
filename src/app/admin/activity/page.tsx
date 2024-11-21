'use client';

import { ReactElement } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LogsList from '@/features/log/components/LogsList';

function ActivityPage(): ReactElement {
  return (
    <div className='container mx-auto p-4'>
      <Card className='mx-auto max-w-7xl'>
        <CardHeader className='flex flex-col items-center'>
          <CardTitle className='text-center text-xl md:text-2xl'>Activity Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <LogsList />
        </CardContent>
      </Card>
    </div>
  );
}

export default ActivityPage;
