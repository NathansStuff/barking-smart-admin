import React from 'react';

import Image from 'next/image';

import Banner from '@/components/general/Banner';
import { Button } from '@/components/ui/button';

function Hero(): React.JSX.Element {
  return (
    <main className='relative min-h-[800px] w-full overflow-hidden'>
      <Banner />
      {/* Base fill layer */}
      <div className='absolute inset-0 bg-[#EFCB68]'></div>
      {/* Gradient overlay */}
      <div className='to-[#F9E539]/54 absolute inset-0 bg-gradient-to-tl from-[#FB5A00] opacity-20'></div>
      {/* Blurred ellipse */}
      <div className='opacity-62 absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#E5DB78] blur-[50px] sm:h-[400px] sm:w-[400px] sm:blur-[70px] md:bottom-10 md:right-10 lg:bottom-20 lg:right-20 lg:h-[600px] lg:w-[600px] lg:blur-[100px] xl:h-[700px] xl:w-[700px]'></div>

      {/* Text Content */}
      <div className='relative w-full flex min-h-[800px] text-center flex-col items-start justify-start px-4 pt-24 sm:px-8 sm:pt-32 md:w-3/4 md:justify-center md:px-12 md:pt-0 lg:w-2/3 lg:px-16 xl:w-1/2 xl:px-20 2xl:px-40'>
        <h1 className='mb-4 font-fredoka w-full text-3xl font-bold sm:text-4xl md:mb-6 md:text-5xl'>
          UNLOCK YOUR
          <br />
          DOG&apos;S PAW-TENTIAL
        </h1>

        <p className='mb-6 text-base w-full text-center sm:text-lg md:mb-8 md:text-xl'>
          Tailored training and enriching activities – all designed to make your dog smarter, happier, and healthier.
        </p>

        <div className='relative z-20 flex w-full items-center justify-center flex-col gap-4 sm:flex-row'>
          <Button className='w-full p-4 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(var(--primary))] sm:w-[180px] md:w-[220px] md:p-5 lg:w-[250px]'>
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
            className='w-full border border-primary p-4 text-primary sm:w-[180px] md:w-[220px] md:p-5 lg:w-[250px]'
            variant='secondary'
          >
            Get free sample
          </Button>
        </div>
      </div>

      {/* Pawprint pattern container */}
      <div className='absolute right-0 top-0 z-[1] h-full w-full overflow-hidden sm:w-4/5 md:w-3/4'>
        <Image
          src='/assets/pawprints.svg'
          alt='Pawprints'
          width={400}
          height={400}
          className='h-full w-full rotate-12 opacity-30 sm:opacity-40 md:opacity-60'
        />
      </div>
      {/* Hero Image container */}
      <div className='absolute bottom-0 right-0 z-[2] w-full overflow-hidden sm:left-1/2 sm:right-auto sm:w-2/3 sm:-translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 md:pr-8 lg:right-16 lg:w-auto lg:pr-0 xl:right-20'>
        <Image
          src='/assets/hero.png'
          alt='Happy Bernese Mountain Dog'
          width={1200}
          height={1200}
          className='h-full w-full object-contain sm:object-center md:object-right-bottom'
          priority
        />
      </div>
    </main>
  );
}

export default Hero;
