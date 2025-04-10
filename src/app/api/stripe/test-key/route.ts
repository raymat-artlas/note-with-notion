import { NextResponse } from 'next/server';

export async function GET() {
  const stripeKey = process.env.STRIPE_SECRET_KEY || '';
  
  return NextResponse.json({
    keyExists: !!stripeKey,
    keyLength: stripeKey.length,
    keyPrefix: stripeKey.substring(0, 7),
    isValid: stripeKey.startsWith('sk_')
  });
} 