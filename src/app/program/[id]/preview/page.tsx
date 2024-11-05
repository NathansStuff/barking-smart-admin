import React from 'react';

import AdminOnly from '@/components/container/AdminOnly';
import PdfContainer from '@/features/pdf/components/PdfContainer';
import { getProgramById } from '@/features/program/db/programDal';

interface Props {
  params: {
    id: string;
  };
}

async function PreviewProgramPage({
  params,
}: Props): Promise<React.ReactElement> {
  const { id } = params;

  const program = await getProgramById(id);

  if (!program) {
    return <div>Program not found</div>;
  }

  return (
    <>
      <AdminOnly />
      <section className='overflow-hidden pb-10'>
        <div className='max-w-5xl mx-auto'>
          <PdfContainer program={program} />
        </div>
      </section>
    </>
  );
}

export default PreviewProgramPage;
