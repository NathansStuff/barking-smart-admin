import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { PROJECT_NAME, PUBLIC_EMAIL } from '@/constants';

export default function RefundPolicy(): React.JSX.Element {
  return (
    <div className='container mx-auto max-w-4xl px-4 py-8'>
      <h1 className='section-title mb-8'>Refund Policy</h1>
      <Card className='mb-8'>
        <CardContent className='space-y-6 p-6'>
          <section>
            <h2 className='mb-4 text-2xl font-semibold'>1. Overview</h2>
            <p className='text-muted-foreground'>
              At {PROJECT_NAME}, we want you to be completely satisfied with our dog training services. This refund
              policy outlines when and how you can request a refund for our services.
            </p>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>2. Eligibility for Refunds</h2>
            <ul className='list-disc space-y-2 pl-6 text-muted-foreground'>
              <li>Training programs cancelled within 14 days of purchase</li>
              <li>Unused subscription periods</li>
              <li>Technical issues preventing service delivery</li>
              <li>Services not matching the described offering</li>
            </ul>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>3. Refund Process</h2>
            <p className='mb-4 text-muted-foreground'>To request a refund:</p>
            <ol className='list-decimal space-y-2 pl-6 text-muted-foreground'>
              <li>Contact our support team via email or phone</li>
              <li>Provide your order number and reason for refund</li>
              <li>Allow up to 5-7 business days for review</li>
              <li>Receive confirmation of refund decision</li>
            </ol>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>4. Non-Refundable Items</h2>
            <ul className='list-disc space-y-2 pl-6 text-muted-foreground'>
              <li>Completed training sessions</li>
              <li>Downloadable training materials once accessed</li>
              <li>Customized training plans after delivery</li>
              <li>Services cancelled after the 14-day period</li>
            </ul>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>5. Payment of Refunds</h2>
            <p className='text-muted-foreground'>
              Approved refunds will be processed using the original payment method. Processing time may vary depending
              on your payment provider:
            </p>
            <ul className='mt-2 list-disc space-y-2 pl-6 text-muted-foreground'>
              <li>Credit/Debit Cards: 5-10 business days</li>
              <li>PayPal: 3-5 business days</li>
              <li>Bank Transfers: 5-7 business days</li>
            </ul>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>6. Contact Us</h2>
            <p className='text-muted-foreground'>
              For refund requests or questions about our refund policy, please contact us at{' '}
              <a
                href={`mailto:${PUBLIC_EMAIL}`}
                className='text-link'
              >
                {PUBLIC_EMAIL}
              </a>
            </p>
          </section>

          <p className='mt-8 text-sm text-muted-foreground'>Last updated: {new Date().toLocaleDateString()}</p>
        </CardContent>
      </Card>
    </div>
  );
}
