'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function AuthCallback() {
  const { user } = useAuth();

  useEffect(() => {
    async function handleAuthCallback() {
      if (user) {
        try {
          // Firebase IDトークンを取得
          const idToken = await user.getIdToken();
          
          // 拡張機能に送信するデータを準備
          const authData = {
            isLoggedIn: true,
            authToken: idToken,
            uid: user.uid,
            email: user.email,
            action: 'auth_callback'
          };
          
          // 拡張機能のExtension IDを環境変数から取得
          const extensionId = process.env.NEXT_PUBLIC_EXTENSION_ID;
          
          // Chrome拡張機能にメッセージを送信（拡張機能IDがある場合）
          if (extensionId) {
            chrome.runtime.sendMessage(extensionId, authData, (response) => {
              if (response && response.success) {
                // 成功メッセージを表示
                document.getElementById('status')!.textContent = 
                  '認証成功！拡張機能にログイン情報が保存されました。このページは閉じて構いません。';
              }
            });
          } else {
            // 拡張機能をインストールするように促すメッセージ
            document.getElementById('extension-required')!.style.display = 'block';
          }
        } catch (error) {
          console.error('認証情報の送信エラー:', error);
          document.getElementById('error')!.textContent = 
            'エラーが発生しました。もう一度お試しください。';
        }
      }
    }
    
    handleAuthCallback();
  }, [user]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">拡張機能認証</h1>
        
        <div id="status" className="mb-4">
          認証処理中...
        </div>
        
        <div id="error" className="text-red-600 mb-4"></div>
        
        <div id="extension-required" style={{display: 'none'}} className="p-4 bg-yellow-100 rounded-md">
          <p className="mb-2">Chrome拡張機能がインストールされていないか、設定が正しくありません。</p>
          <a 
            href="/dashboard" 
            className="text-indigo-600 hover:underline"
          >
            ダッシュボードに戻る
          </a>
        </div>
      </div>
    </div>
  );
} 