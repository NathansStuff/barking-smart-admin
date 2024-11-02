import React from 'react';

function PageLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <div className='flex w-full items-center justify-center p-5 md:px-20 lg:px-40'>
      <div className='container max-w-7xl'>{children}</div>
    </div>
  );
}

export default PageLayout;
