'use client';

import React from 'react';

import { Button } from '../ui/button';

function DownloadFreeSample(): React.JSX.Element {
  function onClick(): void {
    console.log('clicked');
  }

  return (
    <Button
      className='z-10 bg-[#E4BD60] px-6 py-3 text-lg text-white hover:bg-[#E4BD60]/80 sm:text-xl md:p-6 md:text-2xl'
      onClick={onClick}
    >
      Download free program
    </Button>
  );
}

export default DownloadFreeSample;
