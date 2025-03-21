import React from 'react';

import { Card, CardContent } from '@/components/ui/card';

interface InfoItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface InfoSectionProps {
  heading: string;
  items: InfoItem[];
}

function InfoSection({ heading, items }: InfoSectionProps): React.JSX.Element {
  return (
    <section className='flex items-center justify-center bg-[#F9FAFB] py-12 sm:py-16 md:py-24 lg:py-32'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='mb-8 text-center font-fredoka text-2xl font-bold text-gray-800 sm:mb-12 sm:text-3xl lg:text-4xl'>
          {heading}
        </h2>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {items.map((item, index) => (
            <Card
              key={index}
              className='shadow-lg transition-transform hover:scale-105'
            >
              <CardContent className='px-4 pt-6 text-center sm:px-6'>
                <div className='mb-4 flex justify-center'>
                  <div className='rounded-full bg-primary p-3 text-white'>{item.icon}</div>
                </div>
                <h3 className='mb-3 text-lg font-semibold text-gray-800 sm:text-xl'>{item.title}</h3>
                <p className='text-sm text-gray-600 sm:text-base'>{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InfoSection;
