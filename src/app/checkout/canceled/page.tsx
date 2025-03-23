import React from 'react';

export default function CanceledPage(): React.ReactElement {
  return (
    <div className='container mx-auto py-12'>
      <h1>Payment Canceled</h1>
      <p>You&apos;ve canceled your payment. Feel free to try again when you&apos;re ready.</p>
      <a
        href='/'
        className='text-blue-600 hover:underline'
      >
        Return to Home
      </a>
    </div>
  );
}
