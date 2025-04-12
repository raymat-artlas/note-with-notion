export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/config';

export async function GET() {
  try {
    // デバッグログの追加
    console.log('Stripe API: チェックアウトセッション作成開始');

    // ハードコードされたIDではなく環境変数から取得
    const priceId = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID;
    if (!priceId) {
      console.error('価格IDが設定されていません');
      return NextResponse.redirect('/plans?error=no-price-id');
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
      success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/plans?error=cancelled`,
    });
    
    return NextResponse.redirect(session.url || '/plans?error=no-url');
  } catch (error: any) {
    console.error('Stripe API: エラー発生', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/plans?error=${encodeURIComponent(error.message || 'unknown')}`);
  }
} 