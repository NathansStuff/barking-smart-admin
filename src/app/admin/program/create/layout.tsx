import { ReactNode } from 'react';

import { Metadata } from 'next';

import { PROJECT_NAME } from '@/constants';

export const metadata: Metadata = {
  title: `Program Create - ${PROJECT_NAME} Admin`,
  description: 'Create a new program',
};

export default function ProgramLayout({ children }: { children: ReactNode }): ReactNode {
  return <>{children}</>;
}
