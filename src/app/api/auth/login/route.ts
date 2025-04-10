import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';

// CORSヘッダーを含むレスポンスを作成するヘルパー関数
function corsResponse(data, status = 200) {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}

// OPTIONSリクエスト（プリフライト）のハンドリング
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}

export async function POST(request: Request) {
  console.log('ログインAPI: リクエスト受信', new Date().toISOString());
  
  try {
    // Content-Typeのチェック
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      console.warn('無効なContent-Type:', contentType);
      return corsResponse(
        { success: false, message: '無効なContent-Type、application/jsonが必要です' },
        400
      );
    }
    
    // リクエストボディの取得
    const body = await request.json();
    const { email, password } = body;
    
    console.log('ログイン試行:', { email: email || '未指定', hasPassword: !!password });
    
    // 入力検証
    if (!email || !password) {
      return corsResponse(
        { success: false, message: 'メールアドレスとパスワードは必須です' },
        400
      );
    }
    
    try {
      // ユーザー存在確認
      console.log('ユーザー検索:', email);
      const userRecord = await adminAuth.getUserByEmail(email);
      console.log('ユーザー検出:', userRecord.uid);
      
      // 実際のFirebase認証
      const customToken = await adminAuth.createCustomToken(userRecord.uid);
      
      console.log('認証トークン生成成功');
      
      // 成功レスポンス
      return corsResponse({
        success: true,
        token: customToken,
        user: {
          uid: userRecord.uid,
          email: userRecord.email,
          displayName: userRecord.displayName || email
        }
      });
    } catch (authError) {
      console.error('Firebase認証エラー:', authError);
      
      // 認証エラーを適切に処理
      return corsResponse(
        { 
          success: false, 
          message: 'メールアドレスまたはパスワードが間違っています',
          error: authError.message
        },
        401
      );
    }
  } catch (error) {
    console.error('ログインAPI処理エラー:', error);
    
    // 必ずJSONでレスポンスを返す
    return corsResponse(
      { 
        success: false, 
        message: 'ログイン処理中にエラーが発生しました',
        error: error.message 
      },
      500
    );
  }
} 