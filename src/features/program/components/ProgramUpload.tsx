import React from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { uploadFile } from '../api/uploadFile';

function ProgramUpload({ onUploadSuccess }: { onUploadSuccess: (url: string) => void }): React.JSX.Element {
  const generateRandomFilename = (): string => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    return `upload_${timestamp}_${randomString}`;
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (!file) return;

    const loading = toast.loading('Uploading form...');

    try {
      const imageUrl = await uploadFile(file, generateRandomFilename());
      if (imageUrl) {
        toast.success('File uploaded successfully');
        onUploadSuccess(imageUrl);
      } else {
        toast.error('Failed to upload file');
      }
    } catch (error) {
      console.error('Error updating file:', error);
      toast.error('An error occurred while updating file');
    } finally {
      toast.dismiss(loading);
    }
  };
  return (
    <>
      <Button
        type='button'
        onClick={() => document.getElementById('upload')?.click()}
      >
        Upload
      </Button>
      <input
        type='file'
        id='upload'
        accept='application/pdf'
        className='hidden'
        onChange={handleFileChange}
      />
    </>
  );
}

export default ProgramUpload;
