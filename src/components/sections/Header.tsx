'use client';
import React from 'react';

import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// Navigation items constant
const NAV_ITEMS = [
  { href: '#why', label: 'Why Barkin smart?' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faqs', label: 'FAQs' },
] as const;

// Reusable NavLink component
const NavLink = ({
  href,
  label,
  className = '',
}: {
  href: `#${string}`;
  label: string;
  className?: string;
}): React.ReactElement => {
  const scrollToSection = (id: string): void => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Link
      href={href}
      className={`transition-colors hover:text-primary ${className}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(href);
      }}
    >
      {label}
    </Link>
  );
};

// Desktop Navigation component
const DesktopNav = (): React.ReactElement => (
  <nav className='hidden items-center space-x-8 md:flex'>
    {NAV_ITEMS.map((item) => (
      <NavLink
        key={item.href}
        {...item}
      />
    ))}
  </nav>
);

// Mobile Navigation component
const MobileNav = (): React.ReactElement => (
  <Sheet>
    <SheetTrigger className='md:hidden'>
      <Menu className='h-6 w-6' />
    </SheetTrigger>
    <SheetContent
      side='right'
      className='w-[80%] sm:w-[540px]'
    >
      <nav className='mt-10 flex flex-col space-y-4'>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            {...item}
            className='text-xl'
          />
        ))}
      </nav>
    </SheetContent>
  </Sheet>
);

// Logo component
const Logo = (): React.ReactElement => (
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
);

function Header(): React.JSX.Element {
  return (
    <div className='absolute top-20 z-[100] w-full'>
      <header className='mx-auto w-[80%] rounded-full bg-white px-4 shadow-md md:px-10'>
        <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4'>
          <Logo />
          <DesktopNav />
          <MobileNav />
        </div>
      </header>
    </div>
  );
}

export default Header;
