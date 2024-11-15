'use client';

import { ReactNode } from 'react';

import PageLayout from '@/components/container/PageLayout';

function LogoTicker(): ReactNode {
  return (
    <div className='bg-white py-8 md:py-12'>
      {' '}
      <PageLayout>
        <div className='container'>
          <div className='flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]'></div>
        </div>
      </PageLayout>
    </div>
  );
}

export default LogoTicker;
