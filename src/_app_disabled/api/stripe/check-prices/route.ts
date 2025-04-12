import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/config';

export async function GET() {
  try {
    // 価格情報の取得
    const prices = await stripe.prices.list({
      limit: 10,
      expand: ['data.product']
    });
    
    return NextResponse.json({
      success: true,
      priceCount: prices.data.length,
      prices: prices.data.map(price => ({
        id: price.id,
        product_name: (price.product as any)?.name || 'Unknown',
        unit_amount: price.unit_amount,
        currency: price.currency,
        type: price.type,
        active: price.active
      }))
    });
  } catch (error) {
    console.error('価格チェックエラー:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 