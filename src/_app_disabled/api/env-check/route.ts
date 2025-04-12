import { NextResponse } from 'next/server';

export async function GET() {
  const publicKeys = Object.keys(process.env)
    .filter(key => key.startsWith('NEXT_PUBLIC_'))
    .map(key => key);
  
  const stripeKeys = Object.keys(process.env)
    .filter(key => key.includes('STRIPE'))
    .map(key => ({
      key,
      value: key.includes('KEY') ? 
        (process.env[key]?.substring(0, 10) + '...') : 
        process.env[key]
    }));
  
  return NextResponse.json({
    publicKeys,
    stripeKeys
  });
} 