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
    
    const { token, priceId, returnUrl, mode = 'subscription' } = await request.json();
    
    // 入力検証のログ
    console.log('リクエスト内容:', { 
      hasToken: !!token, 
      priceId, 
      returnUrl,
      mode
    });
    
    if (!token) {
      return NextResponse.json(
        { message: '認証トークンが必要です' }, 
        { status: 400 }
      );
    }

    if (!priceId) {
      return NextResponse.json(
        { message: '価格IDが必要です' }, 
        { status: 400 }
      );
    }

    // トークンからユーザー情報を取得
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;
    
    // Firebaseからユーザー情報を取得
    const userSnapshot = await adminDb.collection('users').doc(userId).get();
    const userData = userSnapshot.data() || {};
    
    // StripeのカスタマーIDがない場合は作成
    let customerId = userData.stripeCustomerId;
    if (!customerId) {
      // ユーザーの詳細情報を取得
      const userRecord = await adminAuth.getUser(userId);
      
      // Stripeカスタマーを作成
      const customer = await stripe.customers.create({
        email: userRecord.email,
        metadata: {
          firebaseUID: userId
        }
      });
      
      customerId = customer.id;
      
      // ユーザーデータにStripe顧客IDを保存
      await adminDb.collection('users').doc(userId).set(
        { stripeCustomerId: customerId },
        { merge: true }
      );
    }
    
    // チェックアウトセッション作成時のログを追加
    console.log('チェックアウトセッション作成:', {
      customerId, 
      priceId, 
      returnUrl: returnUrl || process.env.NEXT_PUBLIC_URL,
      mode
    });
    
    // ドメインを取得（開発/本番環境で自動的に切り替え）
    const origin = request.headers.get('origin') || 'http://localhost:3000';
    
    // セッション作成 - リダイレクトURLを修正
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode as Stripe.Checkout.SessionCreateParams.Mode,
      success_url: `${origin}/plans?success=true`,
      cancel_url: `${origin}/plans?canceled=true`,
      automatic_tax: { enabled: true },
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