import { NextResponse } from 'next/server';

export async function GET() {
  // 環境変数の詳細な診断
  const stripeKey = process.env.STRIPE_SECRET_KEY || '';
  
  // クリーニング処理を適用（文字列操作のみ、Stripeは利用しない）
  const cleanedKey = stripeKey
    .replace(/\\n/g, '')
    .replace(/\n/g, '')
    .replace(/"/g, '')
    .replace(/\s/g, '');
  
  return NextResponse.json({
    // セキュリティのため最初と最後の数文字のみ表示
    keyFirstChars: stripeKey.substring(0, 7),
    keyLastChars: stripeKey.substring(stripeKey.length - 4),
    keyLength: stripeKey.length,
    cleanedKeyLength: cleanedKey.length,
    hasNewLines: stripeKey.includes('\n'),
    hasEscapedNewLines: stripeKey.includes('\\n'),
    hasSpaces: /\s/.test(stripeKey),
    hasQuotes: stripeKey.includes('"'),
    environmentVariables: Object.keys(process.env)
      .filter(key => key.includes('STRIPE'))
      .map(key => ({ 
        name: key, 
        exists: !!process.env[key],
        length: process.env[key]?.length || 0
      }))
  });
} 