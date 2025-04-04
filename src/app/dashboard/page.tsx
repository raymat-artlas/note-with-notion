'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createUserProfile } from '@/lib/userService';
import { auth } from '@/lib/firebase';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  // デバッグ用ログ
  console.log('Dashboard render:', { loading, user: user?.email });
  
  useEffect(() => {
    console.log('Dashboard useEffect:', { loading, user: user?.email });
    
    // 認証済みかどうかの確認と、リダイレクト処理
    if (!loading && !user) {
      console.log('未認証なのでログインページへリダイレクト');
      router.push('/login');
      return;
    }
    
    // ユーザープロファイルの作成/更新処理
    if (!loading && user) {
      console.log('ユーザープロファイルを作成/更新');
      createUserProfile(user).catch(console.error);
    }
  }, [user, loading, router]);
  
  // ローディング中
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">ユーザー情報を読み込み中...</p>
        </div>
      </div>
    );
  }
  
  // ユーザーがないとき（リダイレクト中の表示）
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">ログインが必要です。リダイレクト中...</p>
        </div>
      </div>
    );
  }
  
  // 以下は既存のダッシュボードUI
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">ダッシュボード</h1>
        
        <div className="flex items-center mb-8 p-4 bg-blue-50 rounded-lg">
          <div className="ml-4">
            <p className="font-medium">ようこそ、{user.displayName || user.email}さん！</p>
            <p className="text-sm text-gray-600">
              現在、Notionとの連携はありません。設定から連携を行ってください。
            </p>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">クイックスタート</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border p-4 rounded-lg hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium">Notionと連携する</h3>
              <p className="text-sm text-gray-600">APIトークンとデータベースIDを設定します</p>
            </div>
            
            <div className="border p-4 rounded-lg hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium">Chrome拡張機能をインストール</h3>
              <p className="text-sm text-gray-600">noteからNotionへの連携を簡単に</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => {
            auth.signOut();
            router.push('/');
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          ログアウト
        </button>
      </div>
    </div>
  );
} 