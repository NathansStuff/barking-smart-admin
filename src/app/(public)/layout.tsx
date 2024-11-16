import { ReactNode } from 'react';

import { Metadata } from 'next';

import BackgroundContainer from '@/components/container/BackgroundContainer';
import Header from '@/features/header/component/Header';

export const metadata: Metadata = {
  title: 'Dashboard - Barking Smart Admin',
  description: 'Barking Smart Administrative dashboard',
};

export default function PublicLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <>
      <Header />
      <BackgroundContainer>{children}</BackgroundContainer>
    </>
  );
}
