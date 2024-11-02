import { ReactNode } from 'react';

import { Mail, Phone } from 'lucide-react';

import { SUPPORT_EMAIL, SUPPORT_PHONE } from '@/constants/publicInfo';

function ContactSupport(): ReactNode {
  return (
    <>
      <p>If you&apos;d like to contact support, you can reach us at:</p>
      <div className='flex space-x-2 items-center mt-4'>
        <a
          href={`tel:${SUPPORT_PHONE}`}
          className='flex space-x-2 items-center text-blue-500 hover:underline'
        >
          <Phone size={16} />
          <p>{SUPPORT_PHONE}</p>
        </a>
      </div>
      <div className='flex space-x-2 items-center mt-2'>
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className='flex space-x-2 items-center text-blue-500 hover:underline'
        >
          <Mail size={16} />
          <p>{SUPPORT_EMAIL}</p>
        </a>
      </div>
    </>
  );
}

export default ContactSupport;
