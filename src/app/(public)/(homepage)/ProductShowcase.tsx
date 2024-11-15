'use client';

import { ReactNode, useRef } from 'react';

import Image from 'next/image';

import ProductImage from '@/assets/product-image.png';
import PageLayout from '@/components/container/PageLayout';

function ProductShowcase(): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className='overflow-x-clip bg-gradient-to-b from-[#fff] to-[#d2dcff]'
    >
      <PageLayout>
        <div className='section-heading'>
          <div className='flex justify-center'>
            <div className='tag'>Craft with Ease</div>
          </div>
          <h2 className='section-title mt-5'>Your Ultimate Logo Creation Tool</h2>
          <p className='section-description mt-5'>
            Effortlessly design and customize your logo in minutes. Choose shapes, colors, and styles to create a unique
            logo that represents your brand.
          </p>
        </div>
        <div className='relative'>
          <Image
            src={ProductImage}
            alt='Product'
            className='mt-10'
          />
        </div>
      </PageLayout>
    </section>
  );
}

export default ProductShowcase;
