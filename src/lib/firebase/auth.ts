import { auth } from './config';

// ウェブアプリ側でトークンを取得して保存する関数
export async function storeAuthToken() {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken();
      
      try {
        // ローカルストレージに保存（拡張機能からアクセス可能）
        localStorage.setItem('firebase_auth_token', token);
        
        // トークン有効期限も保存
        const expireTime = new Date().getTime() + 3600 * 1000; // 1時間
        localStorage.setItem('firebase_auth_token_expire', expireTime.toString());
      } catch (e) {
        console.error('LocalStorage保存エラー:', e);
        // エラーを無視して処理を続行
      }
      
      return token;
    }
  } catch (error) {
    console.error('認証トークン取得エラー:', error);
  }
  return null;
} 