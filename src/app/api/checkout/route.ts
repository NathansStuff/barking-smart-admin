import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { env } from '@/constants/env';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { priceId } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        } as Stripe.Checkout.SessionCreateParams.LineItem,
      ],
      success_url: `${env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/checkout/canceled`,
      custom_fields: [
        {
          key: 'first_name',
          label: {
            type: 'custom',
            custom: 'First Name',
          },
          type: 'text',
        },
        {
          key: 'dog_name',
          label: {
            type: 'custom',
            custom: "Dog's Name",
          },
          type: 'text',
        },
      ],
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
