import { ReactNode } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Barking Smart Admin',
  description: 'Barking Smart Administrative dashboard',
};

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return <>{children}</>;
}
