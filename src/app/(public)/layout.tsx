import { ReactNode } from 'react';

import { Metadata } from 'next';

import BackgroundContainer from '@/components/container/BackgroundContainer';
import { PROJECT_NAME } from '@/constants';
import Header from '@/features/header/component/Header';

export const metadata: Metadata = {
  title: `${PROJECT_NAME} - Admin`,
  description: `${PROJECT_NAME} Administrative dashboard`,
};

export default function PublicLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <>
      <Header />
      <BackgroundContainer>{children}</BackgroundContainer>
    </>
  );
}
