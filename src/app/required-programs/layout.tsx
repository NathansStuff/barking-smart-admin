import { ReactNode } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Required Programs - Barking Smart Admin',
  description: 'Manage Barking Smart required programs',
};

export default function RequiredProgramsLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return <>{children}</>;
}
