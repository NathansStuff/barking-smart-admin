'use client';

import { ReactNode, useState } from 'react';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function FullScreenCalendar(): ReactNode {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const prevMonth = ():void => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = (): void => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getActivityForDay = (day: number): string => {
    const activities = [
      'Puzzle Toys',
      'Scent Work',
      'Agility Training',
      'Relaxation Exercises',
      'New Trick',
      'Outdoor Adventure',
      'Quiet Time Games',
    ];
    return activities[day % 7];
  };

  return (
    <section id="calender" className='bg-background py-12 md:py-16 lg:py-20'>
      <div className='container mx-auto px-4'>
        <div className='mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground'>Monthly Activities</h2>
          <div className='flex items-center gap-4'>
            <Button
              onClick={prevMonth}
              variant='outline'
              size='icon'
              aria-label='Previous month'
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <span className='text-xl font-semibold text-foreground'>
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <Button
              onClick={nextMonth}
              variant='outline'
              size='icon'
              aria-label='Next month'
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
        <div className='mb-2 grid grid-cols-7 gap-2 text-center font-semibold text-muted-foreground'>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className='p-2'
            >
              {day}
            </div>
          ))}
        </div>
        <div className='grid grid-cols-7 gap-2'>
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className='p-2'
            ></div>
          ))}
          {Array.from({ length: daysInMonth }).map((_, index) => (
            <motion.div
              key={index + 1}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className='h-full min-h-[100px]'>
                <CardContent className='p-2'>
                  <div className='mb-2 font-semibold text-foreground'>{index + 1}</div>
                  <div className='text-xs text-muted-foreground sm:text-sm'>{getActivityForDay(index)}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
