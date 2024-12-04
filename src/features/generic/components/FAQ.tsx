'use client';

import React from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqItems } from '@/data/faqItems';

export default function FAQ(): React.JSX.Element {
  return (
    <section className='bg-fade py-24'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-12 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
          Frequently Asked Questions
        </h2>
        <Accordion
          type='single'
          collapsible
          className='mx-auto w-full max-w-3xl'
        >
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
            >
              <AccordionTrigger className='text-left text-lg font-semibold'>{item.question}</AccordionTrigger>
              <AccordionContent className='text-muted-foreground'>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
