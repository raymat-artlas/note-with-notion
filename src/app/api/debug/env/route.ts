import { NextResponse } from 'next/server';

export async function GET() {
  // 環境変数をフィルタリングして返す（安全な情報のみ）
  const safeEnvVars = Object.keys(process.env)
    .filter(key => key.includes('STRIPE') && key.includes('PUBLIC'))
    .reduce((obj, key) => {
      // APIキーの最初の7文字のみを表示（セキュリティのため）
      const value = process.env[key];
      obj[key] = value ? 
        (key.includes('KEY') ? value.substring(0, 7) + '...' : value) 
        : 'undefined';
      return obj;
    }, {} as Record<string, string>);
  
  return NextResponse.json({
    environment: process.env.NODE_ENV,
    stripe: safeEnvVars,
    nextVersion: process.env.NEXT_RUNTIME || 'unknown'
  });
} 