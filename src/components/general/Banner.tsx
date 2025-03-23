import React from 'react';

function Banner(): React.JSX.Element {
  return (
    <div className='relative z-50 flex h-16 w-full items-center justify-center bg-[#ACADB6] text-center text-white'>
      <p className='w-full px-4 text-center text-sm md:px-10 md:text-base'>
        DISCOUNTED : Pet Enrichment Programs 20% OFF
      </p>
    </div>
  );
}

export default Banner;
