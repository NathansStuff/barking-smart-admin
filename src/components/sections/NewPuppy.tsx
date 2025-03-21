import React from 'react';

import { Button } from '../ui/button';

function NewPuppy(): React.JSX.Element {
  return (
    <section className='flex flex-col items-center justify-center gap-4 bg-[#A195AB] py-24'>
      <h2 className='text-5xl font-bold text-black'>
        New <span className='text-yellow-400'>Puppy?</span> Start Off On The Right Paw
      </h2>
      <p className='pb-3 text-2xl text-black'>
        Get A Free Sample Of Our Starter Puppy <br />
        Enrichment Plan - Our Gift To You!
      </p>
      <Button className='bg-[#E4BD60] p-6 text-2xl text-white'> Download free program</Button>
    </section>
  );
}

export default NewPuppy;
