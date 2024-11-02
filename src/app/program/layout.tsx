import { ReactNode } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Programs - Barking Smart Admin',
  description: 'Manage Barking Smart programs',
};

export default function ProgramLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return <>{children}</>;
}
