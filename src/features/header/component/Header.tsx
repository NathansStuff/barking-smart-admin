'use client';

import { ReactNode, useEffect, useState } from 'react';

import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/assets/logosaas.png';
import PageLayout from '@/components/container/PageLayout';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { selectIsLoaded } from '@/contexts/displaySlice';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectIsAuthenticated } from '@/contexts/userSlice';
import { isUserAdmin } from '@/features/user/utils/isUserAdmin';

import { useMobileNavigation } from '../hooks/useMobileNavigation';
import { getHeaderLinks } from '../utils/getHeaderLinks';

import Banner from './Banner';
import { ProfileDropdown } from './ProfileDropdown';
import ThemeButton from './ThemeButton';

function HeaderSkeleton(): ReactNode {
  return <Skeleton className='h-8 w-[90%]' />;
}

function Header(): ReactNode {
  const [isClient, setIsClient] = useState(false);
  const { onOpen } = useMobileNavigation();
  const isLoggedIn = useAppSelector(selectIsAuthenticated);
  const isLoaded = useAppSelector(selectIsLoaded);
  const isAdmin = isUserAdmin();

  const headerLinks = getHeaderLinks(isLoggedIn, isAdmin);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <HeaderSkeleton />;
  }
  return (
    <header className='sticky top-0 z-20 shadow-md backdrop-blur-sm bg-white/70 dark:bg-black/90'>
      <Banner />
      <PageLayout>
        <div className='flex items-center justify-between'>
          {/* Left: Logo */}
          <div className='flex items-center'>
            <Link href='/'>
              <Image
                src={Logo.src}
                alt='logo'
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
                  <Button
                    asChild
                    className='btn btn-primary hidden lg:block'
                  >
                    <Link
                      href={isLoggedIn ? '/' : '/'}
                      passHref
                    >
                      {isLoggedIn ? 'Create Now' : 'Get Started for free'}
                    </Link>
                  </Button>
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
