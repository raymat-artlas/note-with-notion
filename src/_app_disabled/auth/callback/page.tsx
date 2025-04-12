'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState<string>('認証情報を処理中...');
  
  useEffect(() => {
    // 認証処理
    const handleAuth = async () => {
      try {
        // 現在のユーザー情報を取得
        const user = auth.currentUser;
        
        if (!user) {
          setStatus('ユーザー情報が見つかりません。再ログインしてください。');
          setTimeout(() => router.push('/login'), 2000);
          return;
        }
        
        // 認証成功時
        setStatus('認証成功！リダイレクトします...');
        setTimeout(() => router.push('/dashboard'), 1000);
      } catch (error) {
        console.error('認証エラー:', error);
        setStatus('認証処理中にエラーが発生しました。');
      }
    };
    
    handleAuth();
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">認証処理</h2>
        <p id="status" className="text-center mb-4">{status}</p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    </div>
  );
} 