import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({ 
    ok: true, 
    message: "シンプルAPIが動作中",
    time: new Date().toISOString() 
  });
} 