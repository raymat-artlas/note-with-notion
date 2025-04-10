import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export async function GET(request: Request) {
  try {
    // 認証ヘッダーからトークンを取得
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: '認証エラー: トークンがありません' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split('Bearer ')[1];
    
    // トークンを検証してユーザーを取得
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;
    
    // Firestoreからサブスクリプション情報を取得
    const userDoc = await adminDb.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      // ユーザードキュメントが存在しない場合は新規作成
      await adminDb.collection('users').doc(userId).set({
        subscription: {
          status: 'inactive',
          plan: 'free'
        }
      });
      
      return NextResponse.json({
        subscription: {
          status: 'inactive',
          plan: 'free'
        }
      });
    }
    
    const userData = userDoc.data();
    
    return NextResponse.json({
      subscription: userData?.subscription || {
        status: 'inactive',
        plan: 'free'
      }
    });
  } catch (error: any) {
    console.error('サブスクリプション情報取得エラー:', error);
    return NextResponse.json(
      { message: error.message || 'サブスクリプション情報の取得に失敗しました' },
      { status: 500 }
    );
  }
} 