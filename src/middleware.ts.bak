// 全ページを動的に処理するためのミドルウェア
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Cache-Controlヘッダーを設定してキャッシュを無効化
  response.headers.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  );
  
  return response;
}

export const config = {
  matcher: [
    // ルート以外のすべてのパスに適用
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 