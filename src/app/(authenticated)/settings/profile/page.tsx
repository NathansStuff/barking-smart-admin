'use client';

import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import Image from 'next/image';

import LoggedInOnly from '@/components/container/LoggedInOnly';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { selectEmail, selectName, selectProfilePicture } from '@/contexts/userSlice';
import ProfileForm from '@/features/user/components/ProfileForm';
import ProfilePictureUpload from '@/features/user/components/ProfilePictureUpload';

import { ProfilePageSkeleton } from './ProfilePageSkeleton';

export default function ProfilePage(): React.JSX.Element {
  const preferredName = useSelector(selectName);
  const profilePicture = useSelector(selectProfilePicture);
  const email = useSelector(selectEmail);

  if (!email) {
    return (
      <>
        <LoggedInOnly />
        <ProfilePageSkeleton />
      </>
    );
  }

  return (
    <>
      <LoggedInOnly />
      <Card className='w-full max-w-2xl'>
        <CardHeader>
          <CardTitle className='text-2xl'>Profile</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='flex flex-col items-center justify-between gap-4 sm:flex-row md:flex-col lg:flex-row'>
            <div className='flex items-center space-x-4'>
              <Avatar className='h-20 w-20'>
                {profilePicture ? (
                  <Image
                    src={profilePicture}
                    alt={`${preferredName}'s profile`}
                    width={80}
                    height={80}
                    className='rounded-full object-cover'
                  />
                ) : (
                  <AvatarFallback>
                    <FaUserCircle className='h-20 w-20 text-gray-400' />
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <h2 className='text-xl font-semibold'>{preferredName}</h2>
                <p className='text-sm text-muted-foreground'>{email}</p>
              </div>
            </div>
            <ProfilePictureUpload />
          </div>

          <ProfileForm />
        </CardContent>
      </Card>
    </>
  );
}
