'use client';

import React from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import PreferencesForm from '@/features/user/components/PreferencesForm';

function PreferencesPage(): React.JSX.Element {
  return (
    <Card className='w-full max-w-2xl'>
      <CardHeader>
        <h1 className='text-2xl font-bold'>Preferences</h1>
      </CardHeader>
      <CardContent className='space-y-6'>
        <PreferencesForm />
      </CardContent>
    </Card>
  );
}

export default PreferencesPage;
