import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';

export async function GET(req: Request): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json({ success: true, session });
  } catch (error) {
    console.error('Error verifying session:', error);
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
  }
}
