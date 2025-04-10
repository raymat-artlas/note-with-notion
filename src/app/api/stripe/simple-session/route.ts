import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/config';

export async function GET() {
  try {
    // デバッグログの追加
    console.log('Stripe API: チェックアウトセッション作成開始');

    // ハードコードされたIDではなく環境変数から取得
    const priceId = process.env.STRIPE_PRICE_ID_MONTHLY;
    
    if (!priceId) {
      console.error('Stripe API: 価格IDが設定されていません');
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/plans?error=${encodeURIComponent('価格IDが設定されていません')}`);
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId, // 環境変数から取得したIDを使用
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/plans?canceled=true`,
    });
    
    console.log('Stripe API: セッション作成成功', { sessionId: session.id });
    
    // 直接リダイレクト
    return NextResponse.redirect(session.url || '/plans?error=no-url');
  } catch (error: any) {
    console.error('Stripe API: エラー発生', error);
    // エラーの場合は料金プランページに戻る
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/plans?error=${encodeURIComponent(error.message || 'unknown')}`);
  }
} 