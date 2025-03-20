import React from 'react';

import Hero from '@/components/sections/Hero';
import NewPuppy from '@/components/sections/NewPuppy';
import PersonalisedProgram from '@/components/sections/PersonalisedProgram';
import WhyChooseUs from '@/components/sections/WhyChooseUs';

function Homepage(): React.JSX.Element {
  return (
    <>
      <div>
        <Hero />
      </div>
      <PersonalisedProgram />
      <NewPuppy />
      <WhyChooseUs />
      {/* Testimonials */}
      {/* Pricing */}
      {/* FAQ */}
    </>
  );
}

export default Homepage;
