import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // ダッシュボード系のURLにアクセスした場合
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const uid = request.cookies.get('uid')?.value;
    
    // UIDがない場合（未ログイン）
    if (!uid) {
      // クエリパラメータでリダイレクト元を保存
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // その他の場合は通常の処理を続行
  return NextResponse.next();
}

// 適用するパスの設定
export const config = {
  matcher: ['/dashboard/:path*'],
}; 