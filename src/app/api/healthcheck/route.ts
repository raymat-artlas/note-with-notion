import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Firebase Admin SDKが初期化できるか確認
    let adminStatus = 'unknown';
    try {
      const admin = require('@/lib/firebase/admin').default;
      adminStatus = admin && admin.apps?.length > 0 ? 'initialized' : 'not_initialized';
    } catch (e) {
      adminStatus = `error: ${e.message}`;
    }
    
    // クライアント向け設定が存在するか確認
    const clientConfig = {
      hasApiKey: !!process.env.FIREBASE_API_KEY,
      hasAuthDomain: !!process.env.FIREBASE_AUTH_DOMAIN,
      hasProjectId: !!process.env.FIREBASE_PROJECT_ID
    };
    
    return new NextResponse(JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      firebase: {
        admin: adminStatus,
        client: clientConfig
      }
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (error) {
    console.error('Healthcheckエラー:', error);
    
    return new NextResponse(JSON.stringify({
      status: 'error',
      message: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }
} 