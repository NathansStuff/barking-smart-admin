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
    <section className='flex justify-center items-center bg-[#F9FAFB] py-32'>
      <div className='max-w-7xl px-16'>
        <h2 className='mb-12 text-center text-3xl font-bold font-fredoka text-gray-800'>{heading}</h2>

        <div className='grid gap-6 md:grid-cols-3'>
          {items.map((item, index) => (
            <Card
              key={index}
              className='border-none shadow-lg'
            >
              <CardContent className='px-6 pt-6 text-center'>
                <div className='mb-4 flex justify-center'>
                  <div className='rounded-full bg-primary p-3 text-white'>{item.icon}</div>
                </div>
                <h3 className='mb-3 text-xl font-semibold text-gray-800'>{item.title}</h3>
                <p className='text-gray-600'>{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InfoSection;
