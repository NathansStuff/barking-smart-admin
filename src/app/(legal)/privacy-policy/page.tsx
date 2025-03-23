import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { PROJECT_NAME, PUBLIC_EMAIL } from '@/constants';

export default function PrivacyPolicy(): React.JSX.Element {
  return (
    <div className='container mx-auto max-w-4xl px-4 py-8'>
      <h1 className='section-title mb-8'>Privacy Policy</h1>
      <Card className='mb-8'>
        <CardContent className='space-y-6 p-6'>
          <section>
            <h2 className='mb-4 text-2xl font-semibold'>1. Introduction</h2>
            <p className='text-muted-foreground'>
              Welcome to {PROJECT_NAME}. We respect your privacy and are committed to protecting your personal data. This
              privacy policy explains how we handle your information when you use our dog training services and website.
            </p>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>2. Information We Collect</h2>
            <ul className='list-disc space-y-2 pl-6 text-muted-foreground'>
              <li>Personal information (name, email address, phone number)</li>
              <li>Dog-related information (breed, age, behavioral history)</li>
              <li>Payment information</li>
              <li>Usage data and analytics</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>3. How We Use Your Information</h2>
            <p className='mb-4 text-muted-foreground'>We use your information to:</p>
            <ul className='list-disc space-y-2 pl-6 text-muted-foreground'>
              <li>Provide and improve our dog training services</li>
              <li>Communicate with you about your training program</li>
              <li>Process payments and maintain accounts</li>
              <li>Send relevant updates and marketing communications</li>
              <li>Analyze and improve our website and services</li>
            </ul>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>4. Data Security</h2>
            <p className='text-muted-foreground'>
              We implement appropriate security measures to protect your personal information from unauthorized access,
              alteration, disclosure, or destruction. However, no method of transmission over the internet is 100%
              secure.
            </p>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>5. Your Rights</h2>
            <p className='mb-4 text-muted-foreground'>You have the right to:</p>
            <ul className='list-disc space-y-2 pl-6 text-muted-foreground'>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>6. Cookies</h2>
            <p className='text-muted-foreground'>
              We use cookies and similar tracking technologies to enhance your browsing experience. You can control
              cookies through your browser settings. For more information, please see our Cookie Policy.
            </p>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>7. Contact Us</h2>
            <p className='text-muted-foreground'>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a
                href={`mailto:${PUBLIC_EMAIL}`}
                className='text-link'
              >
                {PUBLIC_EMAIL}
              </a>
            </p>
          </section>

          <section>
            <h2 className='mb-4 text-2xl font-semibold'>8. Updates to This Policy</h2>
            <p className='text-muted-foreground'>
              We may update this privacy policy from time to time. The latest version will always be posted on this page
              with the effective date.
            </p>
          </section>

          <p className='mt-8 text-sm text-muted-foreground'>Last updated: {new Date().toLocaleDateString()}</p>
        </CardContent>
      </Card>
    </div>
  );
}
