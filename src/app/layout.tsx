import React from 'react';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import ClientProviders from '@/providers/ClientProviders';

import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Barkin Smart',
  description: 'Barkin Smart',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.ReactNode> {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${poppins.variable}`}
    >
      {/* Favicon */}
      <link
        rel='icon'
        href='/logo/favicon.svg'
      />
      <body className='flex min-h-screen w-full flex-col bg-[url(/assets/bg_img.svg)] bg-cover bg-repeat dark:bg-[url(/assets/bg_img.svg)]'>
        <ClientProviders>
          <main className='flex-grow overflow-auto'>
            <div className='mx-auto w-full'>{children}</div>
          </main>
        </ClientProviders>
      </body>
    </html>
  );
}
