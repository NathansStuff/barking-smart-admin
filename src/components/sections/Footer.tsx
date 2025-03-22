import React from 'react';

import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';

function Footer(): React.ReactElement {
  const corporateLinks = [
    { name: 'About Us', href: '/about' as Route },
    { name: 'Contact Us', href: '/contact' as Route },
    { name: 'FAQs', href: '/faqs' as Route },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' as Route },
    { name: 'Refund Policy', href: '/refund-policy' as Route },
    { name: 'Terms Of Service', href: '/terms-of-service' as Route },
    { name: 'Cookie Policy', href: '/cookie-policy' as Route },
  ];

  return (
    <footer className='relative bg-[#40B6B8] px-4 py-12'>
      <div className='relative z-10 mx-auto max-w-7xl'>
        {/* Main Footer Content */}
        <div className='flex justify-between'>
          {/* Logo Section */}
          <div className='w-1/3 flex justify-center'>
            <Link
              href='/'
              className='inline-block'
            >
              <Image
                src='/logo/logo_lg.png'
                alt='Barkin Smart'
                width={180}
                height={60}
                className='h-auto'
              />
            </Link>
          </div>

          {/* Links Section */}
          <div className='flex w-2/3 gap-16'>
            {/* Corporate Links */}
            <div>
              <h3 className='mb-4 text-lg font-semibold text-black'>Corporate</h3>
              <ul className='space-y-2'>
                {corporateLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className='text-black transition-colors'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className='mb-4 text-lg font-semibold text-black'>Legal</h3>
              <ul className='space-y-2'>
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className='text-black transition-colors'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Methods and Copyright */}
        <div className='mt-12 grid grid-cols-3'>
          <p className='text-sm text-gray-700'>© Copyright Barkin Smart {new Date().getFullYear()}</p>
          <div className='flex justify-center space-x-2'>
            <Image
              src='/images/payment/amex.svg'
              alt='Visa'
              width={40}
              height={25}
              className='h-6 w-auto'
            />
            <Image
              src='/images/payment/amex.svg'
              alt='Mastercard'
              width={40}
              height={25}
              className='h-6 w-auto'
            />
            <Image
              src='/images/payment/amex.svg'
              alt='American Express'
              width={40}
              height={25}
              className='h-6 w-auto'
            />
            <Image
              src='/images/payment/amex.svg'
              alt='PayPal'
              width={40}
              height={25}
              className='h-6 w-auto'
            />
          </div>
        </div>
      </div>

      {/* Dog Image */}
      <Image
        src='/assets/dog2.png'
        alt='happy dog'
        width={400}
        height={400}
        className='absolute bottom-0 right-0 h-[400px] w-auto'
        priority
      />

      {/* Pawtrail */}
      <Image
        src='/assets/pawtrail2.svg'
        alt='pawtrail'
        width={500}
        height={500}
        className='absolute bottom-0 left-0 w-auto h-[100%] '
      />
    </footer>
  );
}

export default Footer;
