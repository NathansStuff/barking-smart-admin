import React from 'react';

import Footer from '@/components/sections/Footer';
import Header from '@/components/sections/Header';
function Layout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
