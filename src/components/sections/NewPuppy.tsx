import React from 'react';

import Image from 'next/image';

import DownloadFreeSample from '../buttons/DownloadFreeSample';

function NewPuppy(): React.JSX.Element {
  return (
    <section className='relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden bg-[#A195AB] px-4 py-12 sm:gap-4 md:px-6 md:py-24'>
      <Image
        src='/assets/cloud_1.svg'
        alt=''
        width={851}
        height={114}
        className='absolute left-0 top-0 w-[85vw] max-w-[800px] opacity-40 mix-blend-multiply sm:w-[60vw] sm:opacity-60 md:w-[50vw] lg:w-[45vw]'
      />
      <Image
        src='/assets/cloud_2.svg'
        alt=''
        width={375.76}
        height={182.45}
        className='absolute left-1/2 top-0 w-[35vw] max-w-[400px] -translate-x-1/2 opacity-50 mix-blend-overlay sm:opacity-80 md:w-[25vw] lg:w-[20vw]'
      />
      <Image
        src='/assets/cloud_3.svg'
        alt=''
        width={375.76}
        height={182.45}
        className='absolute bottom-0 left-1/2 w-[35vw] max-w-[400px] -translate-x-1/2 opacity-40 mix-blend-overlay sm:opacity-70 md:w-[25vw] lg:w-[20vw]'
      />
      <Image
        src='/assets/cloud_4.svg'
        alt=''
        width={375.76}
        height={182.45}
        className='absolute -right-[2vw] bottom-0 w-[35vw] max-w-[400px] translate-y-[20%] opacity-40 mix-blend-multiply sm:translate-y-0 sm:opacity-60 md:-right-10 md:w-[25vw] lg:w-[20vw]'
      />
      <div className='container mx-auto flex max-w-[1400px] flex-col items-center'>
        <h2 className='z-10 max-w-[90%] text-center text-2xl font-bold text-black sm:text-3xl md:max-w-none md:text-5xl'>
          New <span className='text-yellow-400'>Puppy?</span> Start Off On The Right Paw
        </h2>
        <p className='z-10 max-w-[85%] pb-3 text-center text-lg text-black sm:text-xl md:max-w-none md:text-2xl'>
          Get A Free Sample Of Our Starter Puppy{' '}
          <span className='hidden sm:inline'>
            <br />
          </span>
          Enrichment Plan - Our Gift To You!
        </p>
        <DownloadFreeSample />
      </div>
    </section>
  );
}

export default NewPuppy;
