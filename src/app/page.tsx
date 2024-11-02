import { ReactNode } from 'react';

import { Metadata } from 'next';

import Logo from '@/components/general/Logo';
import HomepageContent from '@/components/page/homepage/HomepageContente';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Contact Us - UltimateVanGuide.com',
  description:
    'Contact UltimateVanGuide.com with questions, comments, or suggestions.',
  alternates: {
    canonical: '/contact',
  },
};

function ProfilePage(): ReactNode {
  return (
    <>
      <section className='mx-4 overflow-hidden'>
        <Card className='mx-auto mt-10 max-w-lg text-center'>
          <CardHeader>
            <CardTitle className='text-3xl font-bold'>Admin</CardTitle>
            <CardDescription className='mt-2 text-gray-500'>
              Welcome to the admin dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col items-center justify-center gap-2'>
            <HomepageContent />
          </CardContent>
          <CardFooter className='flex flex-col items-center justify-center gap-2'>
            <Logo variant='stacked' />
          </CardFooter>
        </Card>
      </section>
    </>
  );
}

export default ProfilePage;
