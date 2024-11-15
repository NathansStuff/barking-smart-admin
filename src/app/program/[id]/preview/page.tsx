'use client';

import { ReactNode, use } from 'react';

import VerifedOnly from '@/components/container/VerifiedOnly';
import PdfContainer from '@/features/pdf/components/PdfContainer';
import { useGetProgramById } from '@/features/program/api/useGetProgramById';

import ProgramLoadingPage from '../../ProgramLoadingPage';

function PreviewProgramPage({ params }: { params: Promise<{ id: string }> }): ReactNode {
  const { id } = use(params);

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
        <div className='mx-auto max-w-5xl'>
          <PdfContainer program={programQuery.data.program} />
        </div>
      </section>
    </>
  );
}

export default PreviewProgramPage;
