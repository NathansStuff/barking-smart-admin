'use client';

import React from 'react';

import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

import PageLayout from '@/components/container/PageLayout';
import Logo from '@/components/general/Logo';
import { Skeleton } from '@/components/ui/skeleton';
import { selectIsLoaded } from '@/contexts/displaySlice';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectIsAuthenticated } from '@/contexts/userSlice';

import { useMobileNavigation } from '../hooks/useMobileNavigation';
import { getHeaderLinks } from '../utils/getHeaderLinks';

import { ProfileDropdown } from './ProfileDropdown';
import ThemeButton from './ThemeButton';

function HeaderSkeleton(): React.JSX.Element {
  return <Skeleton className='h-8 w-[90%]' />;
}

function Header(): React.JSX.Element {
  const { onOpen } = useMobileNavigation();
  const isLoggedIn = useAppSelector(selectIsAuthenticated);
  const isLoaded = useAppSelector(selectIsLoaded);

  const headerLinks = getHeaderLinks(isLoggedIn);

  return (
    <header className='sticky top-0 z-20 backdrop-blur-sm'>
      <PageLayout>
        <div className='flex items-center justify-between'>
          {/* Left: Logo */}
          <div className='flex items-center'>
            <Link href='/'>
              <Logo
                variant='dog_og'
                height={40}
                width={40}
              />
            </Link>
          </div>
          {!isLoaded ? (
            <HeaderSkeleton />
          ) : (
            <>
              {/* Middle: Navigation Links */}
              <nav className='hidden flex-1 justify-center md:flex'>
                <div className='flex items-center gap-4 xl:gap-6'>
                  {headerLinks.map((link, index) => (
                    <Link
                      href={link.href}
                      key={index}
                      className='transition-colors duration-200 hover:text-primary/60'
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </nav>
              {/* Right: Get Started Button + Theme Button */}

              <div className='hidden items-end gap-4 md:flex'>
                <div className='flex gap-1'>
                  <ThemeButton />
                  <ProfileDropdown />
                </div>
              </div>
              {/* Mobile Menu Icon */}
              <MenuIcon
                className='size-5 cursor-pointer text-primary transition-colors duration-200 hover:text-primary/60 md:hidden'
                onClick={onOpen}
              />
            </>
          )}
        </div>
      </PageLayout>
    </header>
  );
}

export default Header;
