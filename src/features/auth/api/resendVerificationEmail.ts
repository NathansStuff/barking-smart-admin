import { toast } from 'sonner';

import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

export async function resendVerificationEmail(id: string): Promise<void> {
  const loading = toast.loading('Resending verification email...');
  try {
    await BaseApiClient.get<boolean>(`/api/auth/resend-verification-email/${id}`);

    toast.dismiss(loading);
    toast.success('Verification email sent!');
  } catch (error) {
    console.log('error', error);
    toast.dismiss(loading);
    toast.error('Error resending verification email, please try again');
    return;
  }
}
