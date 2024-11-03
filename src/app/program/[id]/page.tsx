'use client';

import { ReactNode } from 'react';

import VerifedOnly from '@/components/container/VerifiedOnly';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useGetProgramById } from '@/features/program/api/useGetProgramById';
import ProgramForm from '@/features/program/components/ProgramForm';

import ProgramLoadingPage from '../ProgramLoadingPage';

function EditProgramPage({ params }: { params: { id: string } }): ReactNode {
  const programQuery = useGetProgramById(params.id);

  if (programQuery.isLoading) {
    return (
      <>
        <VerifedOnly />
        <ProgramLoadingPage />
      </>
    );
  }

  return (
    <>
      <VerifedOnly />
      <div className='container mx-auto p-4'>
        <Card>
          <CardHeader>
            <CardTitle>Edit Program</CardTitle>
            <CardDescription>Edit existing program</CardDescription>
          </CardHeader>
          <CardContent>
            <ProgramForm program={programQuery.data?.program} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default EditProgramPage;
