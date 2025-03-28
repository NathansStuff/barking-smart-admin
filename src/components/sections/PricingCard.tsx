'use client';

import React from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { redirectToCheckout } from '@/lib/checkout';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  tagline: string;
  ctaText?: string;
  productId: string;
  priceId: string;
}

export function PricingCard({
  title,
  price,
  features,
  tagline,
  ctaText = 'Get Started Now',
  priceId,
}: PricingCardProps): React.ReactElement {
  const handlePurchase = async (priceId: string): Promise<void> => {
    try {
      await redirectToCheckout(priceId);
    } catch (error) {
      console.error('Error:', error);
      // Handle error (show error message to user)
    }
  };
  return (
    <Card className='flex w-[350px] flex-col shadow-md'>
      <CardHeader className='space-y-2 text-center'>
        <h3
          className='pb-4 text-2xl font-bold text-[#0D0D0D]'
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className='font-fredoka text-6xl font-bold text-[#0D0D0D]'>${price}</div>
      </CardHeader>
      <CardContent className='m flex flex-grow flex-col gap-6'>
        <Button
          className='w-full py-6'
          onClick={() => handlePurchase(priceId)}
        >
          {ctaText}
        </Button>
        <div className='space-y-4'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='flex items-center space-x-2 text-sm'
            >
              <Image
                src='/assets/pawprint_left.svg'
                alt='Pawprint'
                width={22}
                height={22}
              />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className='flex flex-col space-y-4'>
        <p
          className='text-center font-fredoka text-[#988BA4]'
          dangerouslySetInnerHTML={{ __html: tagline }}
        />
      </CardFooter>
    </Card>
  );
}
