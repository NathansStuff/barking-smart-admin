import { loadStripe } from '@stripe/stripe-js';

import { env } from '@/constants/env';

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export async function redirectToCheckout(priceId: string): Promise<void> {
  try {
    const stripe = await stripePromise;

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    });

    const { sessionId } = await response.json();

    if (!stripe) throw new Error('Stripe not loaded');

    const result = await stripe.redirectToCheckout({
      sessionId,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
