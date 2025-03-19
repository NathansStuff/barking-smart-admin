import React from 'react';

import Image from 'next/image';

function Homepage(): React.JSX.Element {
  return (
    <main className='min-h-screen w-full'>
      {/* Base fill layer */}
      <div className='absolute inset-0 bg-[#EFCB68]'></div>

      {/* Gradient overlay */}
      <div className='to-[#F9E539]/54 absolute inset-0 bg-gradient-to-tl from-[#FB5A00] opacity-20'></div>
    </main>
  );
}

export default Homepage;

function Inner() {
  return (
    <>
      {/* Add the discount banner */}
      <div className='w-full bg-gray-400 py-2 text-center text-white'>DISCOUNTED · Pet Enrichment Programs 20% OFF</div>

      {/* Navigation */}
      <nav className='mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-full bg-white px-6 py-4 shadow-lg'>
        <div className='flex items-center'>
          <Image
            src='/logo-placeholder.png'
            alt='Barkin Smart Logo'
            width={120}
            height={40}
            className='mr-4'
          />
        </div>
        <div className='flex gap-8'>
          <a
            href='#why'
            className='border-b-2 border-teal-500 text-teal-500'
          >
            Why Barkin Smart?
          </a>
          <a
            href='#pricing'
            className='text-gray-600 hover:text-teal-500'
          >
            Pricing
          </a>
          <a
            href='#faqs'
            className='text-gray-600 hover:text-teal-500'
          >
            FAQs
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-20'>
        <div className='max-w-xl'>
          <h1 className='mb-6 text-6xl font-bold'>
            UNLOCK YOUR
            <br />
            DOG'S PAW-TENTIAL
          </h1>
          <p className='mb-8 text-xl text-gray-700'>
            Tailored training and enriching activities – all designed to make your dog smarter, happier, and healthier.
          </p>
          <div className='flex gap-4'>
            <button className='flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-white hover:bg-teal-600'>
              Get Started Now
              <span className='text-xl'>🐾</span>
            </button>
            <button className='flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-white hover:bg-teal-600'>
              Get free sample
              <span className='text-xl'>🐾</span>
            </button>
          </div>
        </div>
        <div className='relative h-[600px] w-[600px]'>
          <Image
            src='/assets/hero.png'
            alt='Happy Bernese Mountain Dog'
            fill
            className='object-contain'
            priority
          />
        </div>
      </div>
    </>
  );
}
