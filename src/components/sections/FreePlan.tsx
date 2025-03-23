import React from 'react';

import Image from 'next/image';

import DownloadFreeSample from '../buttons/DownloadFreeSample';

function FreePlan(): React.JSX.Element {
  return (
    <section className='mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-4 py-16 lg:flex-row lg:gap-16 lg:px-8 lg:py-40'>
      <div className='w-full max-w-xl flex-shrink-0 text-lg text-[#545454] lg:text-2xl'>
        <h2 className='mb-4 px-4 text-center font-fredoka text-2xl font-bold lg:mb-6 lg:px-0 lg:text-left lg:text-3xl'>
          Snag A Free Puppy Plan!
        </h2>

        <p className='mb-6 lg:mb-8'>
          Get a taste of our Weekly Puppy{' '}
          <span className='hidden lg:inline'>
            <br />
          </span>
          Enrichment with:
        </p>

        <ul className='mb-6 space-y-3 lg:mb-8 lg:space-y-4'>
          <li className='flex items-center'>✔ Easy-peasy training tips</li>
          <li className='flex items-center'>✔ Tail-wagging fun every day</li>
          <li className='flex items-center'>✔ Clever ways to build good habits fast</li>
        </ul>

        <p className='mb-8 lg:mb-16'>
          Start your pup off right—our gift to you! <span className='text-[#545454]'>🐾</span>
        </p>

        <DownloadFreeSample />
      </div>

      <div className='relative mt-8 w-full lg:mt-0 lg:w-[550px] xl:w-[600px]'>
        <div className='relative mx-auto w-full'>
          {/* Purple background card */}
          <div className='absolute bottom-0 left-0 h-[400px] w-[95%] rounded-[32px] bg-[#988BA4] lg:-bottom-6 lg:-left-6 lg:h-[320px] lg:w-full' />
          {/* Image card */}
          <div className='relative h-[400px] overflow-hidden rounded-[32px] lg:h-[320px] lg:w-full'>
            <Image
              src='/assets/dog_with_owner.png'
              alt='Woman in yellow sweater holding a white Pomeranian puppy'
              fill
              sizes='(max-width: 1024px) 95vw, 600px'
              className='object-cover'
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FreePlan;
