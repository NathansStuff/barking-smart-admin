import React from 'react';

import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';
import FreePlan from '@/components/sections/FreePlan';
import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import NewPuppy from '@/components/sections/NewPuppy';
import PersonalisedProgram from '@/components/sections/PersonalisedProgram';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';
import WhyChooseUs from '@/components/sections/WhyChooseUs';

function Homepage(): React.JSX.Element {
  return (
    <main>
      <section className='relative left-0 right-0 top-0 z-50 bg-white'>
        <Header />
      </section>
      <div>
        <Hero />
      </div>
      <PersonalisedProgram />
      <NewPuppy />
      <WhyChooseUs />
      <Testimonials />
      <Pricing />
      <FreePlan />
      <FAQ />
      <Footer />
    </main>
  );
}

export default Homepage;
