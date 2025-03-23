import React from 'react';

import { Minus, Plus } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqItems } from '@/data/faqItems';

function FAQ(): React.ReactElement {
  return (
    <div
      className='bg-[#F9FAFB]'
      id='faq'
    >
      <section className='mx-auto w-full max-w-6xl px-4 py-24'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 font-fredoka text-3xl text-[#545454]'>FREQUENTLY ASKED QUESTIONS</h2>
          <p className='text-[#0D0D0D]'>Smart training, happy dogs! Choose the plan that fits your pup&apos;s needs.</p>
        </div>

        <div className='mx-auto max-w-4xl'>
          <Accordion
            type='single'
            collapsible
            defaultValue='item-0'
            className='space-y-4'
          >
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className='group/item relative overflow-hidden rounded-lg border bg-white shadow-sm before:absolute before:bottom-0 before:left-0 before:top-0 before:w-1 before:bg-primary before:opacity-50 before:transition-opacity before:content-[""] data-[state=open]:before:opacity-100'
              >
                <AccordionTrigger className='group flex items-center justify-between px-6 py-4 font-fredoka text-lg text-[#545454]'>
                  {item.question}
                  <div className='relative h-6 w-6 shrink-0'>
                    <Plus className='absolute text-primary transition-all duration-200 group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-90 group-data-[state=closed]:opacity-100 group-data-[state=open]:opacity-0' />
                    <Minus className='absolute text-primary transition-all duration-200 group-data-[state=closed]:rotate-90 group-data-[state=open]:rotate-0 group-data-[state=closed]:opacity-0 group-data-[state=open]:opacity-100' />
                  </div>
                </AccordionTrigger>
                <AccordionContent className='px-6 pb-4 text-[#0D0D0D]'>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}

export default FAQ;
