import { ReactNode } from 'react';

import { Metadata } from 'next';

import { PROJECT_NAME } from '@/constants';

export const metadata: Metadata = {
  title: `${PROJECT_NAME} - Admin`,
  description: `${PROJECT_NAME} Administrative dashboard`,
};

export default function ProgramLayout({ children }: { children: ReactNode }): ReactNode {
  return <>{children}</>;
}
