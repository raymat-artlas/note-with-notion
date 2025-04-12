/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// サーバーサイド用の環境変数マッピングを追加
const getConfigValue = (key: string, fallback?: string) => {
  const value = process.env[key];
  if (!value && !fallback) {
    console.warn(`環境変数 ${key} が設定されていません`);
  }
  return value || fallback || '';
};

// 現在使われていないためコメント化
// const PLAN_PRICE_ID_MAP = {
//   'free': getConfigValue('STRIPE_PRICE_ID_FREE', getConfigValue('NEXT_PUBLIC_STRIPE_FREE_PRICE_ID')),
//   'monthly': getConfigValue('STRIPE_PRICE_ID_MONTHLY', getConfigValue('NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID')),
//   'yearly': getConfigValue('STRIPE_PRICE_ID_YEARLY', getConfigValue('NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID'))
// };

console.log('Stripe Checkout APIモジュールがロードされました');

// 環境変数診断 - 開発時のみ必要
if (process.env.NODE_ENV !== 'production') {
  const stripeKeyEnv = process.env.STRIPE_SECRET_KEY || '';
  console.log('APIルートでの環境変数診断:', {
    hasStripeKey: !!stripeKeyEnv,
    stripeKeyLength: stripeKeyEnv.length
  });
}

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  console.log('Stripe Checkout API: リクエスト受信', new Date().toISOString());
  
  // ヘッダーを取得してデバッグログに追加
  const headers = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });
  
  console.log('リクエストヘッダー:', JSON.stringify(headers));
  
  try {
    // リクエストのログ出力（デバッグ用）
    console.log('チェックアウトAPIが呼び出されました');
    
    const { returnUrl, plan } = await request.json();
    
    // プラン種別に基づいて適切な環境変数から価格IDを取得
    let priceId;
    switch (plan) {
      case 'monthly':
        priceId = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID;
        break;
      case 'annual':
        priceId = process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID;
        break;
      default:
        return NextResponse.json({ error: '無効なプラン種別です' }, { status: 400 });
    }
    
    if (!priceId) {
      console.error(`価格ID（${plan}）が設定されていません`);
      return NextResponse.json({ error: '価格IDが見つかりません' }, { status: 400 });
    }
    
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2023-10-16',
    });

    // セッション作成時に適切な価格IDを使用
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_URL || 'https://your-domain.com'}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'https://your-domain.com'}/plans?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    // エラーをより詳細に記録
    console.error('Stripe Checkout API エラー:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // 完全なエラーレスポンスを返す
    return NextResponse.json(
      { message: `エラー: ${error.message}` },
      { status: 500 }
    );
  }
}