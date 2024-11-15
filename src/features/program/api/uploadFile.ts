import { BaseApiClientWithMultipart } from '@/features/apiClient/lib/BaseApiClient';

export async function uploadFile(file: File, filename: string): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', filename);

    const response = await BaseApiClientWithMultipart.post<string | null>('/api/file-upload', formData);

    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
}
