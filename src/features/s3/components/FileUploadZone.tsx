'use client';

import { ReactNode, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { Upload } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Props {
  onFileSelect: (file: File) => void;
  className?: string;
}

function FileUploadZone({ onFileSelect, className }: Props): ReactNode {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'cursor-pointer rounded-lg border-2 border-dashed p-4 text-center transition-colors hover:border-primary',
        isDragActive && 'border-primary bg-primary/10',
        className
      )}
    >
      <input {...getInputProps()} />
      <Upload className='mx-auto h-8 w-8 text-muted-foreground' />
      <p className='mt-2 text-sm text-muted-foreground'>
        {isDragActive ? 'Drop the PDF here' : 'Drag & drop a PDF here, or click to select'}
      </p>
    </div>
  );
}

export default FileUploadZone;
