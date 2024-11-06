'use client';

import React from 'react';

import VerifedOnly from '@/components/container/VerifiedOnly';
import PdfContainer from '@/features/pdf/components/PdfContainer';
import { useGetProgramById } from '@/features/program/api/useGetProgramById';

import ProgramLoadingPage from '../../ProgramLoadingPage';
interface Props {
  params: {
    id: string;
  };
}

function PreviewProgramPage({ params }: Props): React.ReactElement {
  const { id } = params;

  const programQuery = useGetProgramById(id);

  if (programQuery.isLoading) {
    return (
      <>
        <VerifedOnly />
        <ProgramLoadingPage />
      </>
    );
  }

  if (!programQuery.data) {
    return <div>Program not found</div>;
  }

  return (
    <>
      <VerifedOnly />
      <section className='overflow-hidden pb-10'>
        <div className='max-w-5xl mx-auto'>
          <PdfContainer program={programQuery.data.program} />
        </div>
      </section>
    </>
  );
}

export default PreviewProgramPage;
