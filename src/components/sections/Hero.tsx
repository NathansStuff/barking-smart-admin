import React from 'react';

import Image from 'next/image';

import Banner from '@/components/general/Banner';
import { Button } from '@/components/ui/button';

function Hero(): React.JSX.Element {
  return (
    <main className='relative h-screen max-h-[900px] w-full overflow-hidden'>
      <Banner />
      {/* Base fill layer */}
      <div className='absolute inset-0 bg-[#EFCB68]'></div>
      {/* Gradient overlay */}
      <div className='to-[#F9E539]/54 absolute inset-0 bg-gradient-to-tl from-[#FB5A00] opacity-20'></div>
      {/* Blurred ellipse */}
      <div className='opacity-62 absolute bottom-20 right-20 h-[700px] w-[700px] rounded-full bg-[#E5DB78] blur-[100px]'></div>

      {/* Text Content */}
      <div className='relative flex h-full w-1/2 flex-col items-start justify-center pl-40'>
        <h1 className='font-fredoka mb-6 text-5xl font-bold'>
          UNLOCK YOUR
          <br />
          DOG&apos;S PAW-TENTIAL
        </h1>

        <p className='mb-8 max-w-lg text-xl'>
          Tailored training and enriching activities – all designed to make your dog smarter, happier,
          <br /> and healthier.
        </p>

        <div className='flex gap-4'>
          <Button className='w-[250px] p-5 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(var(--primary))]'>
            Get Started Now{' '}
            <Image
              src='/assets/pawprint.svg'
              alt='Pawprint'
              width={20}
              height={20}
              className='ml-2'
            />
          </Button>
          <Button
            className='w-[250px] border border-primary p-5 text-primary'
            variant='secondary'
          >
            Get free sample
          </Button>
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

export default Hero;
