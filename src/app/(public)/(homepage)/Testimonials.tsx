'use client';

import { ReactNode } from 'react';

import PageLayout from '@/components/container/PageLayout';

function Testimonials(): ReactNode {
  return (
    <section className='bg-white pt-5'>
      <PageLayout>
        <div className='section-heading'>
          <div className='flex justify-center'>
            <div className='tag'>Testimonials</div>
          </div>
          <h2 className='section-title mt-5'>What Our Users Are Crafting</h2>
          <p className='section-description mt-5'>
            From effortless customization to stunning designs, our logo crafter app has become an invaluable tool for
            creators and businesses worldwide.
          </p>
        </div>
        <div className='mt-10 flex max-h-[738px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]'></div>
      </PageLayout>
    </section>
  );
}

export default Testimonials;
