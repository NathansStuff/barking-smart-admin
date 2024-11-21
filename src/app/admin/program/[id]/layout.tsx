import { ReactNode } from 'react';

import { Metadata } from 'next';

import { PROJECT_NAME } from '@/constants';

export const metadata: Metadata = {
  title: `Program Edit - ${PROJECT_NAME} Admin`,
  description: 'Edit an existing program',
};

export default function ProgramLayout({ children }: { children: ReactNode }): ReactNode {
  return <>{children}</>;
}
