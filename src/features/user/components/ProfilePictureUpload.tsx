import React from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/contexts/storeHooks';
import { selectUserId, setProfilePicture } from '@/contexts/userSlice';

import { updateUser } from '../api/updateUser';
import { uploadProfilePicture } from '../api/uploadProfilePicture';

function ProfilePictureUpload(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) return;

    const loading = toast.loading('Uploading profile picture...');

    try {
      const imageUrl = await uploadProfilePicture(file, userId);
      if (imageUrl) {
        const updatedUser = await updateUser({ imageUrl });
        if (updatedUser) {
          dispatch(setProfilePicture(imageUrl));
          toast.success('Profile picture updated successfully');
        } else {
          toast.error('Failed to update profile picture');
        }
      } else {
        toast.error('Failed to upload profile picture');
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
      toast.error('An error occurred while updating profile picture');
    } finally {
      toast.dismiss(loading);
    }
  };
  return (
    <>
      <Button onClick={() => document.getElementById('profilePicture')?.click()}>Upload Profile Picture</Button>
      <input
        type='file'
        id='profilePicture'
        accept='image/*'
        className='hidden'
        onChange={handleFileChange}
      />
    </>
  );
}

export default ProfilePictureUpload;
