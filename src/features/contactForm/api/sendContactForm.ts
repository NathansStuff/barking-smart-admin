import { toast } from 'sonner';

import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

import { ContactEmailRequest } from '../types/ContactEmailRequest';

export async function sendContactForm(form: ContactEmailRequest): Promise<boolean> {
  const loading = toast.loading('Sending message...');

  // If it is unique, create the URL
  const success = await postContactForm(form);
  if (!success) {
    toast.dismiss(loading);
    toast.error('Failed to send message');
    return false;
  }
  toast.dismiss(loading);
  toast.success('Message sent successfully');
  return true;
}

async function postContactForm(form: ContactEmailRequest): Promise<boolean> {
  try {
    const response = await BaseApiClient.post<{ success: boolean }>('/api/email/contact', form);

    return response.data.success;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
