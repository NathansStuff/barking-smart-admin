'use client';

import { ReactElement, useState } from 'react';

import { ArrowRight, PawPrint } from 'lucide-react';

import { MotionDiv, MotionH1, MotionP } from '@/components/packages/FramerMotion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export default function FeatureCard(): ReactElement {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className='overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-600 text-white md:w-[500px]'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className='relative'>
        <MotionDiv
          className='absolute right-0 top-0 h-64 w-64 rounded-full bg-yellow-300 opacity-20 blur-3xl filter'
          animate={{
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 0.3 : 0.2,
          }}
          transition={{ duration: 0.3 }}
        />
        <div className='relative z-10'>
          <MotionDiv
            className='inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold backdrop-blur-sm'
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <PawPrint className='h-4 w-4' />
            <span>100+ Enrichment Activities</span>
          </MotionDiv>
          <MotionH1
            className='mt-6 text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl'
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Enrich Your Dog&apos;s Life Every Day
          </MotionH1>
        </div>
      </CardHeader>

      <CardContent>
        <MotionP
          className='text-xl tracking-tight text-white/80'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Discover fun and engaging activities to keep your furry friend happy, healthy, and mentally stimulated.
        </MotionP>
      </CardContent>

      <CardFooter className='mt-8 flex items-center gap-4'>
        <MotionDiv
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            size='lg'
            className='transform bg-white text-purple-600 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/90'
          >
            Get Started
          </Button>
        </MotionDiv>
        <MotionDiv
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant='ghost'
            size='lg'
            className='transform text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/10'
          >
            <span>Learn more</span>
            <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
        </MotionDiv>
      </CardFooter>
    </Card>
  );
}
