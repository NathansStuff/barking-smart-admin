import { ReactNode } from 'react';

import Link from 'next/link';

import { footerCategories } from '@/data/footerCategories';
import { footerLinks } from '@/data/footerLinks';
import { socialLinks } from '@/data/socialLinks';

export default function Footer(): ReactNode {
  return (
    <footer className='bg-fade py-12 text-foreground'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Dog Enrichment</h3>
            <p className='text-sm text-muted-foreground'>
              Enhancing the lives of dogs through engaging activities and mental stimulation.
            </p>
          </div>
          {footerCategories.map((category) => (
            <div key={category}>
              <h3 className='mb-4 text-lg font-semibold'>{category}</h3>
              <ul className='space-y-2'>
                {footerLinks
                  .filter((link) => link.category === category)
                  .map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        className='text-link text-sm'
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Follow Us</h3>
            <div className='flex space-x-4'>
              {socialLinks.map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className='text-muted-foreground hover:text-primary'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Icon className='h-6 w-6' />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className='mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground'>
          <p>&copy; {new Date().getFullYear()} Dog Enrichment. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
