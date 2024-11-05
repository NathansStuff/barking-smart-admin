'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProgramWithId } from '@/features/program/types/Program';

import DownloadPdfButton from './DownloadPdfButton';
import { PDFTemplate1 } from './PdfTemplate1';
import { PDFTemplate2 } from './PdfTemplate2';

interface Props {
  program: ProgramWithId;
}

function PdfContainer({ program }: Props): React.ReactElement {
  const [variation, setVariation] = useState<number>(1);

  function changeVariation(number: number): void {
    setVariation(number);
  }

  return (
    <>
      <div className='flex gap-2 justify-center items-center py-10'>
        <Button onClick={() => changeVariation(1)}>Variation 1</Button>
        <Button onClick={() => changeVariation(2)}>Variation 2</Button>
        <Separator
          orientation='vertical'
          className='h-10 bg-accent-foreground'
        />
        <DownloadPdfButton program={program} variation={variation} />
      </div>
      <div className='min-h-screen w-full flex justify-center py-8 bg-gray-100'>
        <div className='relative mx-auto'>
          {/* Main container */}
          <div className='relative w-full min-h-[297mm] bg-white shadow-md'>
            {/* Page break dotted lines */}
            <div className='absolute inset-0 w-full h-full'>
              <div
                className='absolute inset-0 w-full z-10'
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(to bottom, transparent, transparent calc(297mm - 1px), transparent calc(297mm - 1px), transparent 297mm)',
                  backgroundSize: '100% 297mm',
                  backgroundRepeat: 'repeat-y',
                  mask: 'linear-gradient(to right, transparent 0px, transparent 2px, black 2px, black calc(100% - 2px), transparent calc(100% - 2px))',
                }}
              >
                {[...Array(20)].map(
                  (_, index) =>
                    index > 0 && (
                      <div
                        key={index}
                        className='absolute w-full border-t-2 border-dotted border-gray-400'
                        style={{ top: `${index * 297}mm` }}
                      />
                    )
                )}
              </div>
            </div>

            {/* Border container */}
            <div className='relative w-full h-full border-2 border-dotted border-gray-400'>
              {/* Content wrapper with overflow handling */}
              <div className='relative w-full h-full'>
                {/* Content with overflow container */}
                <div className='p-8 overflow-x-auto'>
                  {variation === 1 && <PDFTemplate1 program={program} />}
                  {variation === 2 && <PDFTemplate2 program={program} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PdfContainer;
