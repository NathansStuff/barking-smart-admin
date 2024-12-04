'use client';

import { ReactNode } from 'react';

import { motion } from 'framer-motion';
import { Bone, Brain, Calendar, Heart, Moon, PawPrint, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function WeeklyActivities(): ReactNode {
  const activities = [
    { icon: Brain, title: 'Puzzle Toys', day: 'Monday' },
    { icon: PawPrint, title: 'Scent Work', day: 'Tuesday' },
    { icon: Bone, title: 'Agility Training', day: 'Wednesday' },
    { icon: Heart, title: 'Relaxation Exercises', day: 'Thursday' },
    { icon: Calendar, title: 'New Activity', day: 'Friday' },
    { icon: Sun, title: 'Outdoor Adventure', day: 'Saturday' },
    { icon: Moon, title: 'Quiet Time Games', day: 'Sunday' },
  ];

  return (
    <section
      id='activities'
      className='bg-gradient py-12 md:py-16 lg:py-20'
    >
      <div className='container mx-auto px-4'>
        <h2 className='mb-8 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl'>
          This Week&apos;s Activities
        </h2>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7'>
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className='h-full'>
                <CardHeader>
                  <CardTitle className='flex items-center justify-center'>
                    <activity.icon className='h-10 w-10 text-primary' />
                  </CardTitle>
                </CardHeader>
                <CardContent className='text-center'>
                  <h3 className='mb-1 text-base font-semibold sm:text-lg'>{activity.title}</h3>
                  <p className='text-sm text-muted-foreground'>{activity.day}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className='mt-12 text-center'>
          <Button
            size='lg'
            className='bg-primary text-primary-foreground hover:bg-primary/90'
          >
            Download This Week&apos;s PDF
          </Button>
        </div>
      </div>
    </section>
  );
}
