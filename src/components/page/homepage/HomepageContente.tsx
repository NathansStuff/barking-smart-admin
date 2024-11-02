'use client';

import { ReactNode } from 'react';

import { capitalizeString } from '@operation-firefly/capitalize-string';

import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';
import GoogleButton from '@/features/auth/components/GoogleButton';
import { EUserRole } from '@/features/user/types/EUserRole';

import ContactSupport from './ContactSupport';

function HomepageContent(): ReactNode {
  const user = useAppSelector(selectUser);

  if (!user.isAuthenticated)
    return (
      <div>
        <p className='pb-4'>Looks like you aren&apos;t signed in. </p>
        <GoogleButton formType='login' />
      </div>
    );

  return (
    <>
      {user.role === EUserRole.PENDING && (
        <>
          <p className='text-center'>
            Looks like your account is pending approval.
          </p>
          <ContactSupport />
        </>
      )}

      {user.role === EUserRole.DECLINED && (
        <>
          <p className='text-center'>
            Your request has been declined. Please contact support for further
            assistance.
          </p>
          <ContactSupport />
        </>
      )}

      {(user.role === EUserRole.ADMIN || user.role === EUserRole.USER) && (
        <>
          <p className='text-center'>
            Welcome,{' '}
            <span className='font-bold underline'>{user.name || 'User'}!</span>{' '}
            You are logged in as
          </p>
          <h3 className='text-center text-3xl'>
            {capitalizeString(user.role)}
          </h3>
        </>
      )}
    </>
  );
}

export default HomepageContent;
