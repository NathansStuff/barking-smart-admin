import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { PROJECT_NAME, PUBLIC_EMAIL } from '@/constants';

export default function Terms(): React.JSX.Element {
  return (
    <div className='container mx-auto max-w-4xl px-4 py-8'>
      <h1 className='section-title mb-8'>Terms of Service</h1>
      <Card className='mb-8'>
        <CardContent className='space-y-6 p-6'>
          <section>
            <h2 className='mb-4 text-2xl font-semibold'>1. Agreement to Terms</h2>
            <p className='text-muted-foreground'>
              By accessing or using {PROJECT_NAME}&apos;s services, you agree to be bound by these Terms of Service. If
              you disagree with any part of these terms, you may not access our services.
            </p>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>2. Description of Services</h2>
            <p className='text-muted-foreground'>
              {PROJECT_NAME} provides online dog training services, including but not limited to:
            </p>
            <ul className='mt-2 list-disc space-y-2 pl-6 text-muted-foreground'>
              <li>Personalized training programs</li>
              <li>Digital training resources and materials</li>
              <li>Online consultation sessions</li>
              <li>Progress tracking tools</li>
            </ul>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>3. User Responsibilities</h2>
            <ul className='list-disc space-y-2 pl-6 text-muted-foreground'>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Follow training instructions responsibly</li>
              <li>Respect intellectual property rights</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>4. Subscription and Payments</h2>
            <p className='mb-4 text-muted-foreground'>By purchasing our services, you agree to:</p>
            <ul className='list-disc space-y-2 pl-6 text-muted-foreground'>
              <li>Pay all fees and charges associated with your subscription</li>
              <li>Provide current, complete, and accurate billing information</li>
              <li>Automatically renew your subscription unless cancelled</li>
              <li>Accept our refund policy terms</li>
            </ul>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>5. Intellectual Property</h2>
            <p className='text-muted-foreground'>
              All content, features, and functionality of our services are owned by {PROJECT_NAME} and are protected by
              international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>6. Limitation of Liability</h2>
            <p className='text-muted-foreground'>
              {PROJECT_NAME} shall not be liable for any indirect, incidental, special, consequential, or punitive
              damages resulting from your use or inability to use our services.
            </p>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>7. Changes to Terms</h2>
            <p className='text-muted-foreground'>
              We reserve the right to modify these terms at any time. We will notify users of any material changes via
              email or through our website.
            </p>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>8. Contact Information</h2>
            <p className='text-muted-foreground'>
              For questions about these Terms of Service, please contact us at{' '}
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
