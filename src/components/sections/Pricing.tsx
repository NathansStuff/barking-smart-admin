import React from 'react';

import { PricingCard } from '@/components/sections/PricingCard';
import { products } from '@/data/products';

function Pricing(): React.ReactElement {
  return (
    <section className='container mx-auto px-4 py-16'>
      <div className='mb-12 text-center'>
        <h2 className='mb-4 font-fredoka text-3xl text-[#545454]'>PRICING</h2>
        <p className='text-black'>Smart training, happy dogs! Choose the plan that fits your pup&apos;s needs.</p>
      </div>
      <div className='flex w-full justify-center'>
        <div className='flex flex-col gap-10 md:flex-row'>
          {products.map((product, index) => (
            <PricingCard
              key={index}
              title={product.title}
              price={product.price}
              features={product.features}
              tagline={product.tagline}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
