'use client';

import React, { ReactNode } from 'react';

import { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import VerifedOnly from '@/components/container/VerifiedOnly';
import { cn } from '@/lib/utils';

interface SettingsLayoutProps {
  children: ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps): React.JSX.Element {
  const pathname = usePathname();

  const navItems: { name: string; href: Route }[] = [
    { name: 'Profile', href: '/settings/profile' },
    { name: 'Billing', href: '/settings/billing' },
    { name: 'Preferences', href: '/settings/preferences' },
    { name: 'Account', href: '/settings/account' },
  ];

  return (
    <>
      <VerifedOnly />
      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col justify-center md:flex-row md:gap-8'>
          <nav className='mb-8 w-full md:mb-0 md:w-64'>
            <h1 className='mb-6 text-center text-2xl font-bold'>Settings</h1>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'my-2 block rounded-md px-4 py-2 text-sm font-medium',
                  pathname === item.href ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <main className='w-full max-w-2xl flex-grow'>{children}</main>
        </div>
      </div>
    </>
  );
}
