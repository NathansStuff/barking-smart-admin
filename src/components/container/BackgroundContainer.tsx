import React from 'react';

interface BackgroundContainerProps {
  children: React.ReactNode;
}

function BackgroundContainer({ children }: BackgroundContainerProps): React.ReactNode {
  return (
    <main className='flex-1 overflow-hidden bg-[url(/assets/bg_img.svg)] bg-cover bg-repeat dark:bg-[url(/assets/bg_img.svg)]'>
      {children}
    </main>
  );
}

export default BackgroundContainer;
