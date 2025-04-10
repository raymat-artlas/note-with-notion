import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/config';

export async function GET() {
  try {
    // Stripeの基本テスト - 製品一覧を取得
    const products = await stripe.products.list({
      limit: 3,
    });
    
    return NextResponse.json({
      success: true,
      productCount: products.data.length,
      firstProduct: products.data[0]?.name || 'なし',
      apiStatus: 'OK'
    });
  } catch (error: any) {
    console.error('Stripeテストエラー:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      type: error.type,
      stack: error.stack?.substring(0, 100) + '...'
    }, { status: 500 });
  }
} 