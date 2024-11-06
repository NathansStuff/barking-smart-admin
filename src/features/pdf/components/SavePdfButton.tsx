'use client';

import React from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useUpdateProgram } from '@/features/program/api/useUpdateProgram';
import { ProgramWithId } from '@/features/program/types/Program';

import { savePdf } from '../api/savePdf';

interface Props {
  program: ProgramWithId;
  variation: number;
  onSuccess?: (link: string) => void;
}

function SavePdfButton({
  program,
  variation,
  onSuccess,
}: Props): React.ReactElement {
  const updateMutation = useUpdateProgram();
  async function handleClick(): Promise<void> {
    try {
      toast.loading('Saving PDF...');
      const url = await savePdf(program, variation);
      await updateMutation.mutate({
        id: program._id.toString(),
        data: {
          pdfLink: url,
          variation,
        },
      });
      onSuccess?.(url);
      toast.dismiss();
      toast.success('PDF saved successfully');
    } catch (error) {
      console.error('Error saving PDF:', error);
      toast.dismiss();
      toast.error('Failed to save PDF. Please try again.');
    }
  }
  return <Button onClick={handleClick}>Save PDF</Button>;
}

export default SavePdfButton;
