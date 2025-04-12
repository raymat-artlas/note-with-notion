import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/config';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export async function POST(request: Request) {
  try {
    const { returnUrl } = await request.json();
    const url = new URL(request.url);
    const planId = url.searchParams.get('plan');
    const userId = url.searchParams.get('userId');

    if (!planId || !userId) {
      return NextResponse.json(
        { message: 'プランIDとユーザーIDが必要です' },
        { status: 400 }
      );
    }

    // ユーザー情報を取得
    const userRecord = await adminAuth.getUser(userId);
    if (!userRecord) {
      return NextResponse.json(
        { message: 'ユーザーが見つかりません' },
        { status: 404 }
      );
    }

    // 料金プランIDの検証（実際のStripe料金プランIDに置き換えてください）
    const validPriceIds: Record<string, string> = {
      price_monthly: process.env.STRIPE_PRICE_MONTHLY || 'price_monthly',
      price_yearly: process.env.STRIPE_PRICE_YEARLY || 'price_yearly'
    };

    const priceId = validPriceIds[planId];
    if (!priceId) {
      return NextResponse.json(
        { message: '無効なプランIDです' },
        { status: 400 }
      );
    }

    // チェックアウトセッション作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${new URL(request.url).origin}/pricing/upgrade?error=支払いがキャンセルされました`,
      customer_email: userRecord.email,
      client_reference_id: userId,
      metadata: {
        userId: userId,
        planId: planId
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripeチェックアウト作成エラー:', error);
    return NextResponse.json(
      { message: error.message || 'チェックアウト作成中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 