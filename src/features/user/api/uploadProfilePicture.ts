import { BaseApiClientWithMultipart } from '@/features/apiClient/lib/BaseApiClient';

export async function uploadProfilePicture(file: File, userId: string): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await BaseApiClientWithMultipart.post<string | null>(
      `/api/user/${userId}/profile-picture`,
      formData
    );

    return response.data;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    return null;
  }
}
