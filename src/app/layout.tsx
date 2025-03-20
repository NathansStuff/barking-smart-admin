import React from 'react';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
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
  const session = await getServerSession(authOptions);

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
      <body className='flex h-screen w-screen flex-col'>
        <ClientProviders session={session}>
          {/* <main className='flex-grow overflow-auto bg-[url(/assets/bg_img.svg)] bg-cover bg-repeat dark:bg-[url(/assets/bg_img.svg)]'> */}
          {children}
          {/* </main> */}
        </ClientProviders>
      </body>
    </html>
  );
}
