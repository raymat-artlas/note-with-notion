import { NextResponse } from 'next/server';
import { auth as adminAuth } from '@/lib/firebase/admin';

export async function GET(request: Request) {
  try {
    // 認証ヘッダーからトークンを取得
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: '認証トークンがありません' }, { status: 401 });
    }
    
    const token = authHeader.split('Bearer ')[1];
    
    // Firebaseでトークンを検証
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    return NextResponse.json({
      uid: decodedToken.uid,
      email: decodedToken.email,
      isPremium: decodedToken.isPremium || false,
      emailVerified: decodedToken.email_verified
    });
  } catch (error: any) {
    console.error('認証検証エラー:', error);
    return NextResponse.json({ message: '無効な認証トークンです' }, { status: 401 });
  }
} 