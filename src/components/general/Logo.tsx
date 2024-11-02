import React from 'react';

import Image from 'next/image';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  variant: 'default' | 'stacked' | 'dog' | 'dog_og';
  height?: number;
  width?: number;
}

function Logo({
  className,
  variant = 'default',
  height = 300,
  width = 300,
}: Props): React.JSX.Element {
  const logoSrc = `/logo/${variant}.svg`;
  const darkSrc = `/logo/${variant}_dark.svg`;

  return (
    <>
      <Image
        src={logoSrc}
        alt='logo'
        width={width}
        height={height}
        className={cn('', className, 'hidden dark:block')}
      />
      <Image
        src={darkSrc}
        alt='logo'
        width={width}
        height={height}
        className={cn('', className, 'dark:hidden block')}
      />
    </>
  );
}

export default Logo;
