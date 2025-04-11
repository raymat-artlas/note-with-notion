import { NextResponse } from 'next/server';

export function middleware(request) {
  try {
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/error', request.url));
  }
}

export const config = {
  matcher: [
    '/api/:path*',
    '/auth/:path*',
    '/dashboard/:path*'
  ]
}; 