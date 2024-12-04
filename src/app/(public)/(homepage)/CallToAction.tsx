'use client';

import { ReactNode } from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function CallToAction(): ReactNode {
  return (
    <section className='bg-background py-24 text-secondary-foreground'>
      <div className='container mx-auto px-4 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='mb-6 text-4xl font-bold'>Start Enriching Your Dog&apos;s Life Today</h2>
          <p className='mx-auto mb-8 max-w-2xl text-xl'>
            Join thousands of happy dog owners who are providing their furry friends with engaging and stimulating
            activities every day.
          </p>
          <div className='flex justify-center gap-4'>
            <Button
              className='bg-primary text-primary-foreground hover:bg-primary/90'
              asChild
            >
              <Link href='/signup'>Get Started Now</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
