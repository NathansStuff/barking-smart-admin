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

      {/* Content wrapper with max-width */}
      <div className='relative mx-auto max-w-[1600px]'>
        {/* Blurred ellipse */}
        <div className='opacity-62 absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#E5DB78] blur-[50px] sm:h-[400px] sm:w-[400px] sm:blur-[70px] md:bottom-10 md:right-10 lg:bottom-20 lg:right-20 lg:h-[600px] lg:w-[600px] lg:blur-[100px] xl:h-[700px] xl:w-[700px]'></div>
        {/* Text Content */}
        <div className='relative flex min-h-[800px] w-full flex-col items-start justify-start px-4 pt-24 text-center sm:px-8 sm:pt-32 lg:w-3/4 lg:justify-center lg:px-12 lg:pt-0 xl:w-1/2 xl:px-10 2xl:px-20'>
          <h1 className='mb-4 w-full font-fredoka text-3xl font-bold sm:text-4xl lg:mb-6 lg:text-5xl xl:text-left'>
            UNLOCK YOUR
            <br />
            DOG&apos;S PAW-TENTIAL
          </h1>

          <p className='mb-6 w-full text-center text-base sm:text-lg md:px-40 lg:mb-8 lg:text-xl xl:px-0 xl:text-left'>
            Tailored training and enriching activities – all designed to make your dog smarter, happier, and healthier.
          </p>

          <div className='relative z-20 flex w-full flex-col items-center justify-center gap-4 sm:flex-row'>
            <Button className='w-full p-4 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(var(--primary))] sm:w-[180px] md:w-[220px] md:p-5 lg:w-[250px] xl:w-full'>
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
              className='w-full border border-primary p-4 text-primary sm:w-[180px] md:w-[220px] md:p-5 lg:w-[250px] xl:w-full'
              variant='secondary'
            >
              Get free sample
            </Button>
          </div>
        </div>

        {/* Pawprint pattern container */}
        <div className='absolute bottom-0 left-20 z-[1] h-[55%] w-full overflow-hidden lg:h-full'>
          <Image
            src='/assets/pawprints.svg'
            alt='Pawprints'
            width={400}
            height={400}
            className='absolute bottom-0 right-0 h-full w-full rotate-12 opacity-90 sm:relative'
          />
        </div>
        {/* Hero Image container */}
        <div className='absolute bottom-0 right-0 z-[2] flex h-auto w-full items-end justify-center overflow-hidden sm:left-1/2 sm:right-auto sm:w-2/3 sm:-translate-x-1/2 md:bottom-0 md:h-[560px] md:items-end md:justify-center lg:left-auto lg:right-0 lg:h-auto lg:translate-x-0 '>
          <Image
            src='/assets/hero.png'
            alt='Happy Bernese Mountain Dog'
            width={1200}
            height={1200}
            className='h-auto w-full max-w-full object-contain object-bottom sm:object-center md:max-h-[464px] lg:object-right-bottom xl:max-h-[900px]'
            priority
          />
        </div>
      </div>
    </main>
  );
}

export default Hero;
