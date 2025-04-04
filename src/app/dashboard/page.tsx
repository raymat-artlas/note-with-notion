'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createUserProfile } from '@/lib/userService';

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [profileCreated, setProfileCreated] = useState(false);
  
  console.log('Dashboard render:', { loading, user: user?.email, profileCreated });
  
  // 認証チェック
  useEffect(() => {
    if (!loading && !user) {
      console.log('未認証のためログインページへリダイレクト');
      router.push('/login');
    }
  }, [user, loading, router]);

  // プロファイル作成は別のuseEffectで分離
  useEffect(() => {
    if (user && !profileCreated) {
      console.log('ユーザープロフィール作成中...');
      createUserProfile(user)
        .then(() => {
          console.log('プロフィール作成完了');
          setProfileCreated(true);
        })
        .catch(err => {
          console.error('プロフィール作成エラー:', err);
        });
    }
  }, [user, profileCreated]);
  
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
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">ログインが必要です。リダイレクト中...</p>
        </div>
      </div>
    );
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
          onClick={async () => {
            await signOut();
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