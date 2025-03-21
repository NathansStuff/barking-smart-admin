import React from 'react';

import Image from 'next/image';

import { Button } from '../ui/button';

function NewPuppy(): React.JSX.Element {
  return (
    <section className='relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden bg-[#A195AB] py-24'>
      <Image
        src='/assets/cloud_1.svg'
        alt=''
        width={851}
        height={114}
        className='absolute left-[0.5px] top-0 w-1/2 opacity-60 mix-blend-multiply'
      />
      <Image
        src='/assets/cloud_2.svg'
        alt=''
        width={375.76}
        height={182.45}
        className='absolute left-1/2 top-0 w-1/4 -translate-x-1/2 opacity-80 mix-blend-overlay'
      />
      <Image
        src='/assets/cloud_3.svg'
        alt=''
        width={375.76}
        height={182.45}
        className='absolute bottom-0 left-[43%] w-1/4 -translate-x-1/2 opacity-70 mix-blend-overlay'
      />
      <Image
        src='/assets/cloud_4.svg'
        alt=''
        width={375.76}
        height={182.45}
        className='absolute -right-10 bottom-0 h-2/3 w-1/4 opacity-60 mix-blend-multiply'
      />
      <h2 className='z-10 text-5xl font-bold text-black'>
        New <span className='text-yellow-400'>Puppy?</span> Start Off On The Right Paw
      </h2>
      <p className='z-10 pb-3 text-2xl text-black'>
        Get A Free Sample Of Our Starter Puppy <br />
        Enrichment Plan - Our Gift To You!
      </p>
      <Button className='z-10 bg-[#E4BD60] p-6 text-2xl text-white'> Download free program</Button>
    </section>
  );
}

export default NewPuppy;
