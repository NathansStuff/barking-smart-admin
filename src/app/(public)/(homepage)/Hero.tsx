'use client';

import React from 'react';

import Image from 'next/image';

import FeatureCard from './FeatureCard';

export default function Hero(): React.JSX.Element {
  return (
    <section className='bg-fade pb-20 pt-8'>
      <div className='container mx-auto px-4'>
        <div className='items-center md:flex md:gap-8'>
          <FeatureCard />

          <div className='relative mt-12 md:mt-0 md:flex-1'>
            <div className='aspect-square overflow-hidden rounded-lg shadow-xl'>
              <Image
                src='/hero.jpg'
                alt='Happy dog playing with a colorful toy'
                width={648}
                height={648}
                className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
