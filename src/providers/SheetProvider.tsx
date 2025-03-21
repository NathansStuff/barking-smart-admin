'use client';

import { ReactNode } from 'react';
import { useMountedState } from 'react-use';

function SheetProvider(): ReactNode {
  const isMounted = useMountedState();

  if (!isMounted) {
    return null;
  }

  return <></>;
}

export default SheetProvider;
