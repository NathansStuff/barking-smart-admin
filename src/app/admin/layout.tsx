import { ReactNode } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Barking Smart Admin',
  description: 'Barking Smart Administrative page',
};

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return <>{children}</>;
}
