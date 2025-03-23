'use client';
import React from 'react';

import Image from 'next/image';

function Header(): React.JSX.Element {
  
  return (
    <div className='absolute top-20 z-[100] w-full'>
      <header className='mx-auto w-[80%] rounded-full bg-white px-10 shadow-md'>
        {/* Main Navigation */}
        <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Image
              src='/logo/logo_rectangle_white.svg'
              alt='Barkin Smart Logo'
              width={150}
              height={50}
            />
          </div>

          {/* Navigation Links */}
          <nav className='flex items-center space-x-8'>
            <a
              href='#why'
              className='border-b-2 border-teal-500 text-teal-500'
            >
              Why Barkin smart?
            </a>
            <a
              href='#pricing'
              className='text-gray-700 transition-colors hover:text-teal-500'
            >
              Pricing
            </a>
            <a
              href='#faqs'
              className='text-gray-700 transition-colors hover:text-teal-500'
            >
              FAQs
            </a>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
