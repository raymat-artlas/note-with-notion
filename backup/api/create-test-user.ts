import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../lib/firebase/admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // テスト用ユーザーを作成
    const userRecord = await auth.createUser({
      email: 'test@example.com',
      password: 'password123',
      displayName: 'Test User',
    });

    res.status(200).json({ success: true, uid: userRecord.uid });
  } catch (error: any) {
    console.error('テストユーザー作成エラー:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'テストユーザーの作成に失敗しました' 
    });
  }
} 