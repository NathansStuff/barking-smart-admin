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
import DogForm from '@/features/dog/components/DogForm';

function EditDogPage({ params }: { params: { id: string } }): ReactNode {
  const dogQuery = useGetDog(params.id);

  if (dogQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mx-auto p-4'>
      <Card>
        <CardHeader>
          <CardTitle>Edit Dog</CardTitle>
          <CardDescription>Edit existing dog profile</CardDescription>
        </CardHeader>
        <CardContent>
          <DogForm dog={dogQuery.data} />
        </CardContent>
      </Card>
    </div>
  );
}

export default EditDogPage;