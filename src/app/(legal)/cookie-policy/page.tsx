import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { PROJECT_NAME, PUBLIC_EMAIL } from '@/constants';

export default function CookiePolicy(): React.JSX.Element {
  return (
    <div className='container mx-auto max-w-4xl px-4 py-8'>
      <h1 className='section-title mb-8'>Cookie Policy</h1>
      <Card className='mb-8'>
        <CardContent className='space-y-6 p-6'>
          <section>
            <h2 className='mb-4 text-2xl font-semibold'>1. Introduction</h2>
            <p className='text-muted-foreground'>
              This Cookie Policy explains how {PROJECT_NAME} uses cookies and similar technologies to recognize you when
              you visit our website. It explains what these technologies are and why we use them, as well as your rights
              to control our use of them.
            </p>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>2. What Are Cookies</h2>
            <p className='text-muted-foreground'>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website.
              They are widely used by website owners to make their websites work, or work more efficiently, as well as
              to provide reporting information.
            </p>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>3. Types of Cookies We Use</h2>
            <ul className='list-disc space-y-2 pl-6 text-muted-foreground'>
              <li>
                <strong>Essential Cookies:</strong> Required for the website to function properly
              </li>
              <li>
                <strong>Functional Cookies:</strong> Help with website functionality and remembering your preferences
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website
              </li>
              <li>
                <strong>Marketing Cookies:</strong> Used to track visitors across websites for marketing purposes
              </li>
            </ul>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>4. How We Use Cookies</h2>
            <p className='mb-4 text-muted-foreground'>We use cookies for the following purposes:</p>
            <ul className='list-disc space-y-2 pl-6 text-muted-foreground'>
              <li>To provide and maintain our service</li>
              <li>To authenticate users and prevent fraudulent use</li>
              <li>To remember your preferences and settings</li>
              <li>To analyze how our website is used and improve our service</li>
              <li>To deliver relevant marketing content</li>
            </ul>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>5. Your Cookie Choices</h2>
            <p className='text-muted-foreground'>You can control and manage cookies in various ways. You can:</p>
            <ul className='mt-2 list-disc space-y-2 pl-6 text-muted-foreground'>
              <li>Modify your browser settings to reject cookies</li>
              <li>Delete cookies that have already been stored</li>
              <li>Choose to opt-out of specific cookie categories through our cookie consent tool</li>
            </ul>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>6. Contact Us</h2>
            <p className='text-muted-foreground'>
              If you have any questions about our use of cookies, please contact us at{' '}
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
