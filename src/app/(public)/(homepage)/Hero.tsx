'use client';

import { ReactNode } from 'react';

import { ArrowRight } from 'lucide-react';

import PageLayout from '@/components/container/PageLayout';
import { Button } from '@/components/ui/button';

function Hero(): ReactNode {
  return (
    <section className='overflow-x-clip bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183Ec2,#EAEEFE_100%)] pb-20 pt-8'>
      <PageLayout>
        <div className='items-center md:flex'>
          <div className='md:w-[478px]'>
            <div className='tag'>Version 2.0 is here</div>
            <h1 className='mt-6 bg-gradient-to-b from-black to-[#001E80] bg-clip-text text-5xl font-bold tracking-tighter text-transparent'>
              Create Stunning Logos in Minutes
            </h1>
            <p className='mt-6 text-xl tracking-tight text-[#010D3E]'>
              Unleash your creativity with our intuitive logo crafter. Customize shapes, colors, and styles to design
              the perfect logo for your brand.
            </p>
            <div className='mt-[30px] flex items-center gap-1'>
              <Button>Get for free</Button>
              <Button
                variant='ghost'
                className='btn btn-text gap-1'
              >
                <span>Learn more</span>
                <ArrowRight className='size-4' />
              </Button>
            </div>
          </div>
          <div className='relative mt-20 md:mt-0 md:h-[648px] md:flex-1'></div>
        </div>
      </PageLayout>
    </section>
  );
}

export default Hero;
