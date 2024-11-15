'use client';

import React from 'react';

import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { deleteUser } from '@/features/user/api/deleteUser';
import UseConfirm from '@/hooks/UseConfirm';

export default function AccountPage(): React.JSX.Element {
  const [ConfirmDialog, confirm] = UseConfirm('Delete Account', 'Are you sure you want to delete your account?');

  async function handleDeleteAccount(): Promise<void> {
    const ok = await confirm();
    if (!ok) {
      return;
    }
    const loading = toast.loading('Deleting account...');
    const success = await deleteUser();
    if (!success) {
      toast.error('Failed to delete account');
    }
    toast.success('Account deleted successfully');
    toast.dismiss(loading);
    signOut({
      callbackUrl: '/',
    });
  }

  return (
    <>
      <ConfirmDialog />
      <Card>
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p className='font-semibold text-red-600'>
            Warning: Deleting your account is permanent and cannot be undone. All your data will be lost.
          </p>
          <Button
            variant='destructive'
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
