export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function GET() {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2023-10-16',
    });

    // 正しい環境変数名を使用
    const priceId = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID;
    if (!priceId) {
      console.error('月間プラン価格IDが設定されていません');
      return NextResponse.json({ error: '価格IDが設定されていません' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_URL || 'https://your-domain.com'}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'https://your-domain.com'}/plans?canceled=true`,
    });

    return NextResponse.redirect(session.url || new URL('/plans?error=session_error', process.env.NEXT_PUBLIC_URL));
  } catch (error) {
    console.error('Stripe session creation error:', error);
    return NextResponse.redirect(new URL('/plans?error=stripe_error', process.env.NEXT_PUBLIC_URL));
  }
} 