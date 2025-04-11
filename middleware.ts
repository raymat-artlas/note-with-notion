import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// すべてのルートをSSRモードで処理する
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // SSRフラグをすべてのリクエストに設定
  response.headers.set('x-middleware-cache', 'no-cache');
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  
  // リダイレクトループを防止するチェック（クエリパラメータを検証）
  const url = request.nextUrl.clone();
  const hasRedirectParam = url.searchParams.has('_r');
  
  // リダイレクトループ防止
  if (hasRedirectParam) {
    // すでにリダイレクトされている場合は何もしない
    return response;
  }
  
  // App RouterとPages Routerのルーティング競合を解決
  // トップページはPages Routerで処理
  if (url.pathname === '/' || url.pathname === '/index') {
    // リダイレクトループを避けるためにパラメータを追加
    url.searchParams.set('_r', '1');
    return NextResponse.redirect(url);
  }
  
  return response;
}

// すべてのルートに適用（静的ファイルを除く）
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 