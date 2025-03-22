import React from 'react';

import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';
import Hero from '@/components/sections/Hero';
import NewPuppy from '@/components/sections/NewPuppy';
import PersonalisedProgram from '@/components/sections/PersonalisedProgram';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';
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
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
}

export default Homepage;
