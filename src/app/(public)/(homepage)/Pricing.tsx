'use client';

import { ReactNode } from 'react';

import { CheckIcon } from 'lucide-react';
import Link from 'next/link';

import { MotionDiv } from '@/components/packages/FramerMotion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { pricingFeatures } from '@/data/pricingFeatures';

export default function Pricing(): ReactNode {
  return (
    <section
      id='pricing'
      className='bg-fade py-24'
    >
      <div className='container mx-auto px-4'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            Simple, Transparent Pricing
          </h2>
          <p className='text-xl text-muted-foreground'>Unlock a world of dog enrichment with a one-time payment.</p>
        </div>
        <div className='flex justify-center'>
          <MotionDiv
            className='w-full max-w-md'
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card className='overflow-hidden'>
              <CardHeader className='bg-primary text-primary-foreground'>
                <CardTitle className='text-2xl font-bold'>Lifetime Access</CardTitle>
              </CardHeader>
              <CardContent className='pt-6'>
                <div className='mb-6 text-center'>
                  <span className='text-4xl font-bold text-foreground'>$19.99</span>
                  <span className='text-muted-foreground'> one-time</span>
                </div>
                <Button
                  className='mb-6 w-full'
                  size='lg'
                  asChild
                >
                  <Link href='/signup'>Get Started</Link>
                </Button>
                <ul className='space-y-3'>
                  {pricingFeatures.map((feature, index) => (
                    <li
                      key={index}
                      className='flex items-center'
                    >
                      <CheckIcon className='mr-2 h-5 w-5 text-primary' />
                      <span className='text-foreground'>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
