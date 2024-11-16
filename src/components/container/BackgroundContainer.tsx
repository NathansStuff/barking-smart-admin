import React from 'react';

interface BackgroundContainerProps {
  children: React.ReactNode;
}

function BackgroundContainer({ children }: BackgroundContainerProps): React.ReactNode {
  return (
    <main className='flex-1 overflow-hidden bg-[url(/assets/light-bg.svg)] bg-cover bg-repeat dark:bg-[url(/assets/dark-bg.svg)]'>
      {children}
    </main>
  );
}

export default BackgroundContainer;
