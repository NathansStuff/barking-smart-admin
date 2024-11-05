'use client';

import React from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { ProgramWithId } from '@/features/program/types/Program';

import { downloadPdf } from '../api/downloadPdf';

interface Props {
  program: ProgramWithId;
  variation: number;
}

function DownloadPdfButton({ program, variation }: Props): React.ReactElement {
  async function handleClick(): Promise<void> {
    try {
      toast.loading('Generating PDF...');
      const response = await downloadPdf(program, variation);

      if (!response.ok) {
        toast.dismiss();
        toast.error('Failed to generate PDF. Please try again.');
        throw new Error('PDF generation failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${program.title.replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.dismiss();
      toast.success('PDF downloaded successfully');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.dismiss();
      toast.error('Failed to download PDF. Please try again.');
    }
  }
  return <Button onClick={handleClick}>Download PDF</Button>;
}

export default DownloadPdfButton;
