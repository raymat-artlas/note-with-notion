import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { Client } from '@notionhq/client';
import { auth } from '@/lib/firebase/config';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export async function POST(request: Request) {
  try {
    // リクエストから認証トークンを取得
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: '認証が必要です' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    // Firebaseでトークンを検証
    const decodedToken = await auth.verifyIdToken(token);
    
    // リクエストボディを解析
    const { text, url, title, tags, databaseId } = await request.json();
    
    // Notionクライアントの初期化
    // ユーザーのNotionトークンをデータベースから取得する必要があります
    const notionClient = new Client({ auth: process.env.NOTION_API_KEY });
    
    // Notionページの作成
    const response = await notionClient.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Title: {
          title: [
            {
              text: {
                content: title || 'ハイライト'
              }
            }
          ]
        },
        URL: {
          url: url
        },
        Tags: {
          multi_select: tags.split(',').map(tag => ({ name: tag.trim() }))
        }
      },
      children: [
        {
          object: 'block',
          type: 'quote',
          quote: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: text
                }
              }
            ]
          }
        }
      ]
    });
    
    return NextResponse.json({
      success: true,
      pageId: response.id
    });
  } catch (error: any) {
    console.error('ハイライト保存エラー:', error);
    return NextResponse.json(
      { message: error.message || 'ハイライトの保存に失敗しました', success: false },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    // リクエストからAuthorizationヘッダーを取得
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      );
    }
    
    // Bearerトークンを抽出
    const token = authHeader.split('Bearer ')[1];
    
    // Firebaseでトークンを検証
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;
    
    // ユーザーのハイライトをFirestoreから取得
    const highlightsSnapshot = await adminDb
      .collection('highlights')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();
    
    // ハイライトデータを整形
    const highlights = highlightsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return NextResponse.json({ highlights });
  } catch (error: any) {
    console.error('ハイライト取得エラー:', error);
    
    if (error.code === 'auth/id-token-expired') {
      return NextResponse.json(
        { error: 'トークンの有効期限が切れています。再ログインしてください。' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
} 