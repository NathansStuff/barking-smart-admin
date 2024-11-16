'use client';

import { ReactNode, use } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetDog } from '@/features/dog/api/useGetDog';
import DogForm from '@/features/dog/components/DogForm';
import { DogFormSkeleton } from '@/features/dog/components/DogFormSkeleton';

function EditDogPage({ params }: { params: Promise<{ id: string }> }): ReactNode {
  const { id } = use(params);

  const dogQuery = useGetDog(id);

  return (
    <div className='container mx-auto p-4'>
      <Card>
        <CardHeader>
          <CardTitle>Edit Dog</CardTitle>
          <CardDescription>Edit existing dog profile</CardDescription>
        </CardHeader>
        <CardContent>{dogQuery.isLoading ? <DogFormSkeleton /> : <DogForm dog={dogQuery.data} />}</CardContent>
      </Card>
    </div>
  );
}

export default EditDogPage;
