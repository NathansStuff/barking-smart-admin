import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Image from 'next/image';

import { testimonialData } from '@/data/testimonialsData';

import { Card, CardContent } from '../ui/card';

function Testimonials(): React.ReactElement {
  return (
    <section className='relative overflow-hidden py-16'>
      {/* Base fill layer */}
      <div className='absolute inset-0 z-0 bg-[#EFCB68]/50'></div>
      {/* Gradient overlay */}
      <div className='absolute inset-0 bg-[linear-gradient(150deg,#F9E53954,#FB5A00)] opacity-20'></div>
      <div className='absolute -right-[28%] -top-[10%] h-[80%] w-full'>
        <Image
          src='/assets/pawtrail.svg'
          alt='paw trail'
          fill
          className='object-contain'
          priority
        />
      </div>

      <div className='container relative z-10 mx-auto px-4'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 font-fredoka text-3xl text-[#545454]'>CLIENT SUCCESS STORIES</h2>
          <p className='font-medium text-[#0D0D0D]'>
            See how BarkinSmart has helped dogs and their owners achieve amazing results
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {testimonialData.map((testimonial, index) => (
            <Card
              key={index}
              className='overflow-hidden border border-[#F0ECEC] bg-white p-6 shadow-md transition-transform duration-200 hover:scale-[1.02]'
            >
              <CardContent className='p-0'>
                <div className='mb-4 flex items-center justify-between'>
                  <div className='flex gap-1'>
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Image
                        key={i}
                        src='/assets/star.svg'
                        alt='Star'
                        width={24}
                        height={24}
                        className='size-6 text-yellow-400'
                      />
                    ))}
                  </div>
                  <Image
                    src='/google.svg'
                    alt='Google Review'
                    width={24}
                    height={24}
                    className='size-6'
                  />
                </div>

                <h3 className='mb-3 text-lg font-semibold text-[#0D0D0D]'>{testimonial.title}</h3>

                <p className='mb-6 text-[#0D0D0D]'>{testimonial.text}</p>

                <div className='flex items-center gap-3'>
                  <Avatar className='size-7'>
                    <AvatarImage
                      src={testimonial.imageSrc}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='text-xs font-medium text-black'>{testimonial.name}</p>
                    <p className='text-xs text-black'>
                      {new Intl.DateTimeFormat('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })
                        .format(testimonial.date)
                        .replace(/\//g, '-')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
