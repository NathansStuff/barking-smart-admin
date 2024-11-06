'use client';

import { ReactNode } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import DogForm from '@/features/dog/components/DogForm';

function CreateDogPage(): ReactNode {
  return (
    <div className='container mx-auto p-4'>
      <Card>
        <CardHeader>
          <CardTitle>Add New Dog</CardTitle>
          <CardDescription>Create a new dog profile</CardDescription>
        </CardHeader>
        <CardContent>
          <DogForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateDogPage;