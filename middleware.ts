import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// すべてのルートをSSRモードで処理する
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // SSRフラグをすべてのリクエストに設定
  response.headers.set('x-middleware-cache', 'no-cache');
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  
  // App RouterとPages Routerの混在時に明示的な優先順位を設定
  // Pages RouterをApp Routerより優先
  const url = request.nextUrl.clone();
  if (url.pathname === '/' || url.pathname === '/index') {
    // ルートパスはPages Routerで処理
    return response;
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