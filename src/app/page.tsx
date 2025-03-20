import React from 'react';

import Hero from '@/components/sections/Hero';
import PersonalisedProgram from '@/components/sections/PersonalisedProgram';
function Homepage(): React.JSX.Element {
  return (
    <>
      <Hero />
      <PersonalisedProgram />
    </>
  );
}

export default Homepage;
