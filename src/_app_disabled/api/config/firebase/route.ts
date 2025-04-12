import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // クライアント側で必要なFirebase設定のみを返す
    // 注意: Admin SDKの認証情報は含めない
    const clientConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID
    };
    
    // すべての設定が存在するか確認
    const missingKeys = Object.entries(clientConfig)
      .filter(([_, value]) => !value)
      .map(([key]) => key);
    
    if (missingKeys.length > 0) {
      console.error('Firebase設定に不足している項目があります:', missingKeys);
      return NextResponse.json(
        {
          error: '不完全なFirebase設定',
          missingKeys
        },
        { status: 500 }
      );
    }
    
    // CORSヘッダーを設定してレスポンスを返す
    return new NextResponse(JSON.stringify(clientConfig), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (error) {
    console.error('Firebase設定API エラー:', error);
    return NextResponse.json(
      { error: 'Firebase設定の取得に失敗しました' },
      { status: 500 }
    );
  }
}

// OPTIONSリクエストに対応（CORSプリフライトリクエスト用）
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
} 