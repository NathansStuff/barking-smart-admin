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
    <footer className='relative bg-[#40B6B8] px-10 py-8 md:px-4 md:py-12'>
      <div className='relative z-10 mx-auto max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px]'>
        {/* Main Footer Content */}
        <div className='flex flex-col justify-between md:flex-row xl:gap-8'>
          {/* Logo Section */}
          <div className='mb-8 flex w-full justify-center md:mb-0 md:w-1/3 xl:w-1/4'>
            <Link
              href='/'
              className='inline-block'
            >
              <Image
                src='/logo/logo_lg.png'
                alt='Barkin Smart'
                width={180}
                height={60}
                className='h-auto w-[140px] md:w-[180px] xl:w-[200px]'
              />
            </Link>
          </div>

          {/* Links Section */}
          <div className='flex w-full flex-col justify-center gap-8 sm:flex-row sm:justify-around md:w-2/3 md:justify-start md:gap-16 xl:w-3/4 xl:gap-24'>
            {/* Corporate Links */}
            <div>
              <h3 className='mb-4 text-lg font-semibold text-black'>Corporate</h3>
              <ul className='space-y-2'>
                {corporateLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className='text-black transition-colors hover:text-gray-800'
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
                      className='text-black transition-colors hover:text-gray-800'
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
        <div className='mt-8 flex flex-col items-center gap-4 md:mt-12 md:grid md:grid-cols-3 md:gap-0 xl:mt-16'>
          <p className='text-center text-sm text-gray-700 xl:text-base'>
            © Copyright Barkin Smart {new Date().getFullYear()}
          </p>
          <div className='flex justify-center space-x-2 xl:space-x-4'>
            <Image
              src='/images/payment/amex.svg'
              alt='Visa'
              width={40}
              height={25}
              className='h-5 w-auto md:h-6 xl:h-7'
            />
            <Image
              src='/images/payment/amex.svg'
              alt='Mastercard'
              width={40}
              height={25}
              className='h-5 w-auto md:h-6 xl:h-7'
            />
            <Image
              src='/images/payment/amex.svg'
              alt='American Express'
              width={40}
              height={25}
              className='h-5 w-auto md:h-6 xl:h-7'
            />
            <Image
              src='/images/payment/amex.svg'
              alt='PayPal'
              width={40}
              height={25}
              className='h-5 w-auto md:h-6 xl:h-7'
            />
          </div>
        </div>
      </div>

      {/* Dog Image */}
      <Image
        src='/assets/dog2.png'
        alt='happy dog'
        width={829}
        height={573}
        className='absolute bottom-0 right-0 h-[207px] w-[300px] lg:h-[414px] lg:w-[600px] xl:h-[518px] xl:w-[750px]'
        priority
      />

      {/* Pawtrail */}
      <Image
        src='/assets/pawtrail2.svg'
        alt='pawtrail'
        width={500}
        height={500}
        className='absolute bottom-0 left-0 h-[50%] w-auto sm:h-[100%]'
      />
    </footer>
  );
}

export default Footer;
