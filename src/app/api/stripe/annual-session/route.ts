import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function GET() {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2023-10-16',
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID_ANNUAL,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_API_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/plans?canceled=true`,
    });

    return NextResponse.redirect(session.url || '');
  } catch (error) {
    console.error('Stripe session creation error:', error);
    return NextResponse.redirect('/plans?error=stripe_error');
  }
} 