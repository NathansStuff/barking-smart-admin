'use client';
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

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
            <Link
              href='#why'
              className='transition-colors hover:text-primary'
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#why')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Why Barkin smart?
            </Link>
            <Link
              href='#pricing'
              className='transition-colors hover:text-primary'
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Pricing
            </Link>
            <Link
              href='#faqs'
              className='transition-colors hover:text-primary'
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#faqs')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              FAQs
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
