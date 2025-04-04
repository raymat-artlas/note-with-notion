'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createUserProfile } from '@/lib/userService';
import { auth } from '@/lib/firebase';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // 未ログイン時はログインページにリダイレクト
    if (!loading && !user) {
      router.push('/login');
    }
    
    // ログイン後、ユーザープロファイルを作成/更新
    if (user) {
      createUserProfile(user).catch(console.error);
    }
  }, [user, loading, router]);
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">読み込み中...</div>;
  }
  
  if (!user) {
    return null; // リダイレクト中
  }
  
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