'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // Verify the session with your backend
      fetch(`/api/verify-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setStatus('success');
          // Handle successful payment confirmation
        })
        .catch(() => setStatus('error'));
    }
  }, [sessionId]);

  return (
    <div className='container mx-auto py-12'>
      {status === 'loading' && <p>Processing your payment...</p>}
      {status === 'success' && (
        <div>
          <h1>Thank you for your purchase!</h1>
          <p>We'll send you a confirmation email shortly.</p>
        </div>
      )}
      {status === 'error' && <p>There was an error confirming your payment. Please contact support.</p>}
    </div>
  );
}
