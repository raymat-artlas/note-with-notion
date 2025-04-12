import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/config';

export async function GET() {
  try {
    // 簡単なStripe API呼び出しテスト - 製品一覧取得
    const products = await stripe.products.list({ limit: 3 });
    
    return NextResponse.json({
      success: true,
      message: 'Stripe APIテスト成功！',
      productCount: products.data.length,
      firstProduct: products.data[0]?.name || 'なし'
    });
  } catch (error) {
    console.error('Stripeシンプルチェックアウトエラー:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 