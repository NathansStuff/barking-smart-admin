'use client';
import React from 'react';

import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

function Header(): React.JSX.Element {
  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='absolute top-20 z-[100] w-full'>
      <header className='mx-auto w-[80%] rounded-full bg-white px-4 shadow-md md:px-10'>
        <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Image
              src='/logo/logo_rectangle.svg'
              className='md:hidden'
              alt='Barkin Smart Logo'
              width={150}
              height={50}
              style={{ width: 'auto', height: 'auto' }}
            />
            <Image
              src='/logo/logo_rectangle_white.svg'
              className='hidden md:block'
              alt='Barkin Smart Logo'
              width={150}
              height={50}
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden items-center space-x-8 md:flex'>
            <Link
              href='#why'
              className='transition-colors hover:text-primary'
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#why');
              }}
            >
              Why Barkin smart?
            </Link>
            <Link
              href='#pricing'
              className='transition-colors hover:text-primary'
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#pricing');
              }}
            >
              Pricing
            </Link>
            <Link
              href='#faqs'
              className='transition-colors hover:text-primary'
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#faqs');
              }}
            >
              FAQs
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger className='md:hidden'>
              <Menu className='h-6 w-6' />
            </SheetTrigger>
            <SheetContent
              side='right'
              className='w-[80%] sm:w-[540px]'
            >
              <nav className='mt-10 flex flex-col space-y-4'>
                <Link
                  href='#why'
                  className='text-xl transition-colors hover:text-primary'
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#why');
                  }}
                >
                  Why Barkin smart?
                </Link>
                <Link
                  href='#pricing'
                  className='text-xl transition-colors hover:text-primary'
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#pricing');
                  }}
                >
                  Pricing
                </Link>
                <Link
                  href='#faqs'
                  className='text-xl transition-colors hover:text-primary'
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#faqs');
                  }}
                >
                  FAQs
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  );
}

export default Header;
