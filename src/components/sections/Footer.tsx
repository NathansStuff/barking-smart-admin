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
    <footer className='relative bg-[#40B6B8] px-4 py-8'>
      <div className='relative z-10 mx-auto max-w-7xl'>
        <div className='grid grid-cols-3 gap-8'>
          {/* Logo */}
          <div>
            <Link
              href='/'
              className='inline-block'
            >
              <Image
                src='/logo/logo_lg.png'
                alt='Barkin Smart'
                width={150}
                height={50}
                className='h-auto'
              />
            </Link>
          </div>

          {/* Corporate Links */}
          <div>
            <h3 className='mb-2 text-lg font-semibold text-gray-800'>Corporate</h3>
            <ul className='space-y-1'>
              {corporateLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-sm text-gray-700 transition-colors hover:text-gray-900'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className='mb-2 text-lg font-semibold text-gray-800'>Legal</h3>
            <ul className='space-y-1'>
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-sm text-gray-700 transition-colors hover:text-gray-900'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Copyright and Payment Methods */}
        <div className='mt-8 flex flex-col items-center space-y-4'>
          <p className='text-sm text-gray-700'>© Copyright Barkin Smart {new Date().getFullYear()}</p>
          <div className='flex items-center justify-center gap-2'>
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
        className='absolute -bottom-0 right-0 h-[400px] w-auto'
        priority
      />
    </footer>
  );
}

export default Footer;
