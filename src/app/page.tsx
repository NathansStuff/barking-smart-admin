import React from 'react';

import Image from 'next/image';

import Banner from '@/components/general/Banner';

function Homepage(): React.JSX.Element {
  return (
    <main className='relative min-h-screen w-full'>
      <Banner />
      {/* Base fill layer */}
      <div className='absolute inset-0 bg-[#EFCB68]'></div>
      {/* Gradient overlay */}
      <div className='to-[#F9E539]/54 absolute inset-0 bg-gradient-to-tl from-[#FB5A00] opacity-20'></div>
      {/* Blurred ellipse */}
      <div className='opacity-62 absolute bottom-20 right-20 h-[700px] w-[700px] rounded-full bg-[#E5DB78] blur-[100px]'></div>

      {/* Text Content */}
      <div className='flex h-full flex-col items-start justify-center relative w-1/2 pl-20'>
        <h1 className='mb-6 text-6xl font-bold'>
          UNLOCK YOUR
          <br />
          DOG&apos;S PAW-TENTIAL
        </h1>

        <p className='mb-8 max-w-lg text-xl'>
          Tailored training and enriching activities – all designed to make your dog smarter, happier, and healthier.
        </p>

        <div className='flex gap-4'>
          <button className='flex items-center rounded-lg bg-teal-500 px-6 py-3 text-white'>
            Get Started Now <span className='ml-2'>🐾</span>
          </button>
          <button className='rounded-lg bg-white px-6 py-3 text-black'>Get free sample</button>
        </div>
      </div>

      {/* Pawprint pattern container */}
      <div className='absolute right-0 top-0 z-10 h-screen w-3/4 overflow-hidden'>
        <Image
          src='/assets/pawprints.svg'
          alt='Pawprints'
          width={400}
          height={400}
          className='h-full w-full opacity-60'
        />
      </div>
      {/* Hero Image container */}
      <div className='absolute bottom-0 right-20 z-10 h-full overflow-hidden'>
        <Image
          src='/assets/hero.png'
          alt='Happy Bernese Mountain Dog'
          width={1200}
          height={1200}
          className='h-full w-full object-contain object-right-bottom'
          priority
        />
      </div>
    </main>
  );
}

export default Homepage;
