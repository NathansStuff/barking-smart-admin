'use client';

import { ReactNode } from 'react';

import SheetProvider from './SheetProvider';

function ClientProviders({ children }: { children: ReactNode }): ReactNode {
  return (
    <>
      <SheetProvider />
      {children}
    </>
  );
}

export default ClientProviders;
